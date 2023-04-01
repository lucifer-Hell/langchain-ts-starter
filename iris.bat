@echo off
setlocal EnableDelayedExpansion
cd /d "D:\pharmeasy-gpt\langChainGpt\langchain-ts-starter"
set args=%*
set "args=!args:"=!"
set "args=!args:^"=!"
@REM echo All args: %args%
set output=
for /f "delims=" %%i in ('npm start -- %args%') do set output=%%i
echo %output%
