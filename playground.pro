
# Build the Qt Quick Web Runtime binary. The Playground uses
# this binary as-is and does not contain additional native code.
include ($$PWD/../qt-quick-web-runtime/qt-quick-web-runtime.pri)

# Install (copy) additional playground files. This includes example
# and data files
playground.path = $$OUT_PWD
playground.files += $$PWD/playground.html
codemirror.files = \
    $$PWD/bower_components/codemirror/lib/codemirror.css \
    $$PWD/bower_components/codemirror/lib/codemirror.js \
    $$PWD/bower_components/codemirror/mode/javascript \
    $$PWD/bower_components/codemirror/mode/javascript/javascript.js
codemirror.path = $$OUT_PWD/codemirror # flattens hierachy
data.path = $$OUT_PWD/data
data.files = $$files($$PWD/data/*)
examples.path = $$OUT_PWD/examples
examples.files = $$files($$PWD/examples/*)
INSTALLS += playground codemirror data examples
