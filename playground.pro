# should be set by Qt, but isn't
INCLUDEPATH += $$(NACL_SDK_ROOT)/include

SOURCES += qtquick.cpp
QT += quick
CONFIG += c++11
TARGET = qtquick