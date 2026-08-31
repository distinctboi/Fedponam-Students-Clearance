/* =========================================================
STUDENTS CLEARANCE MANAGEMENT SYSTEM
ELECTRON MAIN PROCESS
FILE: main.js

PURPOSE:

- Launch the local Electron application
- No preload.js required
- Print clearance certificate through Electron
- Allow the operating system to provide "Save as PDF"
- Open external links safely
- Keep the application completely local
  ========================================================= */

"use strict";

/* =========================================================
ELECTRON MODULES
========================================================= */

const {
app,
BrowserWindow,
ipcMain,
shell
} = require("electron");

/* =========================================================
NODE MODULES
========================================================= */

const path = require("path");

/* =========================================================
APPLICATION WINDOW
========================================================= */

let mainWindow = null;

/* =========================================================
CREATE MAIN WINDOW
========================================================= */

function createWindow() {

mainWindow =
    new BrowserWindow({

        width: 1400,

        height: 850,

        minWidth: 1000,

        minHeight: 650,

        show: false,

        autoHideMenuBar: true,

        title:
            "Students Clearance Management System",


        /* =====================================================
           WEB PREFERENCES

           IMPORTANT:

           We are NOT using preload.js.

           clearance.html can therefore use:

               require("electron")

           directly.

           This matches the architecture of the project.
        ===================================================== */

        webPreferences: {

            nodeIntegration: true,

            contextIsolation: false,

            sandbox: false,

            webSecurity: true

        }

    });


/* =====================================================
   LOAD APPLICATION
===================================================== */

mainWindow.loadFile(
    path.join(
        __dirname,
        "index.html"
    )
);


/* =====================================================
   SHOW WINDOW
===================================================== */

mainWindow.once(
    "ready-to-show",
    function () {

        if (mainWindow) {

            mainWindow.show();

        }

    }
);


/* =====================================================
   EXTERNAL LINKS
===================================================== */

mainWindow.webContents.setWindowOpenHandler(
    function ({ url }) {

        if (
            url &&
            (
                url.startsWith(
                    "http://"
                ) ||
                url.startsWith(
                    "https://"
                )
            )
        ) {

            shell.openExternal(
                url
            );

        }


        return {
            action:
                "deny"
        };

    }
);


/* =====================================================
   PREVENT UNAUTHORIZED NAVIGATION
===================================================== */

mainWindow.webContents.on(
    "will-navigate",
    function (
        event,
        navigationUrl
    ) {

        try {

            const parsedUrl =
                new URL(
                    navigationUrl
                );


            /*
             * Local application files
             * are allowed.
             */

            if (
                parsedUrl.protocol ===
                "file:"
            ) {

                return;

            }


            /*
             * External URLs are opened
             * in the normal system browser.
             */

            event.preventDefault();


            shell.openExternal(
                navigationUrl
            );

        }
        catch (error) {

            event.preventDefault();

            console.error(
                "NAVIGATION ERROR:",
                error
            );

        }

    }
);


/* =====================================================
   WINDOW CLOSED
===================================================== */

mainWindow.on(
    "closed",
    function () {

        mainWindow =
            null;

    }
);

}

/* =========================================================
PRINT CLEARANCE

clearance.html calls:

   electronAPI.invoke("print-clearance")

Electron then opens the native system print dialog.

The user can:
- Select a physical printer
- Select Microsoft Print to PDF
- Select another installed PDF printer
- Save the certificate as a PDF

No jsPDF is required.
========================================================= */

ipcMain.handle(
"print-clearance",
async function (event) {

    try {

        const senderWindow =
            BrowserWindow.fromWebContents(
                event.sender
            );


        if (!senderWindow) {

            return {

                success:
                    false,

                message:
                    "Application window unavailable."

            };

        }


        /*
         * Make sure the page has finished
         * loading before printing.
         */

        if (
            senderWindow.webContents.isLoading()
        ) {

            await new Promise(
                function (resolve) {

                    senderWindow.webContents.once(
                        "did-finish-load",
                        resolve
                    );

                }
            );

        }


        /*
         * Open the native print dialog.
         */

        return await new Promise(
            function (resolve) {

                senderWindow.webContents.print(

                    {

                        /*
                         * FALSE means the
                         * operating system
                         * print dialog is shown.
                         */

                        silent:
                            false,


                        /*
                         * Preserve CSS backgrounds,
                         * borders and certificate styling.
                         */

                        printBackground:
                            true,


                        /*
                         * Use the default printer.
                         */

                        deviceName:
                            "",


                        /*
                         * Colour printing.
                         */

                        color:
                            true,


                        /*
                         * Certificate is portrait.
                         */

                        landscape:
                            false,


                        /*
                         * Use normal printer margins.
                         */

                        margins: {

                            marginType:
                                "default"

                        },


                        /*
                         * One certificate per sheet.
                         */

                        pagesPerSheet:
                            1,


                        /*
                         * Collate copies.
                         */

                        collate:
                            true,


                        /*
                         * One copy.
                         */

                        copies:
                            1

                    },


                    function (
                        success,
                        failureReason
                    ) {

                        if (success) {

                            resolve({

                                success:
                                    true,

                                message:
                                    "Print dialog completed successfully."

                            });

                        }
                        else {

                            resolve({

                                success:
                                    false,

                                message:
                                    failureReason ||
                                    "Printing was cancelled or failed."

                            });

                        }

                    }

                );

            }
        );

    }
    catch (error) {

        console.error(
            "PRINT ERROR:",
            error
        );


        return {

            success:
                false,

            message:
                error &&
                error.message
                    ? error.message
                    : "Unable to print clearance certificate."

        };

    }

}

);

/* =========================================================
OPEN FILE

This can be used later if the application needs to open
a previously saved PDF or another local file.

SECURITY:
Only an existing file path is opened.
========================================================= */

ipcMain.handle(
"open-file",
async function (
event,
filePath
) {

    try {

        if (
            !filePath ||
            typeof filePath !==
            "string"
        ) {

            return {

                success:
                    false,

                message:
                    "Invalid file path."

            };

        }


        const errorMessage =
            await shell.openPath(
                filePath
            );


        if (errorMessage) {

            return {

                success:
                    false,

                message:
                    errorMessage

            };

        }


        return {

            success:
                true,

            message:
                "File opened successfully."

        };

    }
    catch (error) {

        console.error(
            "OPEN FILE ERROR:",
            error
        );


        return {

            success:
                false,

            message:
                error &&
                error.message
                    ? error.message
                    : "Unable to open file."

        };

    }

}

);

/* =========================================================
ELECTRON READY
========================================================= */

app.whenReady().then(
function () {

    createWindow();


    /* =================================================
       macOS SUPPORT
    ================================================= */

    app.on(
        "activate",
        function () {

            if (
                BrowserWindow
                    .getAllWindows()
                    .length === 0
            ) {

                createWindow();

            }

        }
    );

}

);

/* =========================================================
CLOSE APPLICATION
========================================================= */

app.on(
"window-all-closed",
function () {

    /*
     * On Windows and Linux,
     * close the application completely.
     */

    if (
        process.platform !==
        "darwin"
    ) {

        app.quit();

    }

}

);

/* =========================================================
ERROR LOGGING
========================================================= */

process.on(
"uncaughtException",
function (error) {

    console.error(
        "UNCAUGHT EXCEPTION:",
        error
    );

}

);

process.on(
"unhandledRejection",
function (error) {

    console.error(
        "UNHANDLED REJECTION:",
        error
    );

}

);
