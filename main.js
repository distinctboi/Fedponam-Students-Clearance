/* =========================================================
   STUDENTS CLEARANCE MANAGEMENT SYSTEM
   ELECTRON MAIN PROCESS
   FILE: main.js
   ========================================================= */

"use strict";


const {
    app,
    BrowserWindow
} = require("electron");


const path = require("path");



/* =========================================================
   CREATE MAIN APPLICATION WINDOW
   ========================================================= */

function createWindow() {


    const mainWindow =
        new BrowserWindow({

            width: 1400,

            height: 850,

            minWidth: 1000,

            minHeight: 650,

            show: false,

            autoHideMenuBar: true,

            title:
                "Students Clearance Management System",


            webPreferences: {

                nodeIntegration: false,

                contextIsolation: true,

                sandbox: true,

                webSecurity: true

            }

        });



    /* =====================================================
       LOAD MAIN PORTAL
       ===================================================== */

    mainWindow.loadFile(

        path.join(
            __dirname,
            "index.html"
        )

    );



    /* =====================================================
       SHOW WINDOW WHEN READY
       ===================================================== */

    mainWindow.once(

        "ready-to-show",

        function () {

            mainWindow.show();

        }

    );



    /* =====================================================
       OPEN EXTERNAL LINKS IN DEFAULT BROWSER
       ===================================================== */

    mainWindow.webContents.setWindowOpenHandler(

        function ({ url }) {


            require("electron")
                .shell
                .openExternal(url);


            return {

                action:
                    "deny"

            };


        }

    );



    /* =====================================================
       HANDLE EXTERNAL NAVIGATION
       ===================================================== */

    mainWindow.webContents.on(

        "will-navigate",

        function (
            event,
            navigationUrl
        ) {


            const parsedUrl =
                new URL(
                    navigationUrl
                );


            if (
                parsedUrl.protocol !==
                "file:"
            ) {


                event.preventDefault();


                require("electron")
                    .shell
                    .openExternal(
                        navigationUrl
                    );

            }


        }

    );


}



/* =========================================================
   ELECTRON READY
   ========================================================= */

app.whenReady().then(

    function () {


        createWindow();



        /* =============================================
           MACOS WINDOW REOPEN SUPPORT
        ============================================== */

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


        if (
            process.platform !==
            "darwin"
        ) {


            app.quit();

        }


    }

);