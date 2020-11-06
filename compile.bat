@echo off

if not exist "bin" MKDIR bin
if not exist "bin\resources" Xcopy resources bin\resources /I
CALL devTools/concatFiles.bat js\ "*.js" bin\script.js
:: Run the appropriate compiler for the user's CPU architecture.
if %PROCESSOR_ARCHITECTURE% == AMD64 (
	CALL "%~dp0devTools\tweeGo\tweego_win64.exe" -o "%~dp0bin/index.html" --module="%~dp0bin/script.js" --head devTools/head.html "%~dp0src"
) else (
	CALL "%~dp0devTools\tweeGo\tweego_win86.exe" -o "%~dp0bin/index.html" --module="%~dp0bin/script.js" --head devTools/head.html "%~dp0src"
)
DEL "bin\script.js"
popd
ECHO Done
