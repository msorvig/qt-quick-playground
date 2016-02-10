The Qt Quick Playground
=======================

The Qt Quick Playground is a live coding environment for Qt Quick.
It is built on the Qt Quick Web Runtime, which is again build on Qt
for Google Native Client.

Building
----------------------

Standard Qt for NaCl build, with "make install" to copy html and resource
files.

    /path/to/qtbase/bin/qmake && make install && /path/to/qtbase/bin/nacldeployqt qtquickruntime.bc

Binaries and Demo
----------------------

The gh-pages branch contains a binary build of the playground. A public accessible
demo is available at:

    http://msorvig.github.io/qt-quick-playground/index.html
