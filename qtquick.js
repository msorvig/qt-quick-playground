// JavaScript for the QtQuick.js runtime. The other
// components are qtquick.pexe and qtquick.nmf

function QtQuick(config)
{
    var self = this;
    self.config = config;

    // configure Qt from qtloader.js.
    var qtConfig = config
    config["src"] = "qtquick.nmf"
    config["type"] = "application/x-pnacl"
    var qt = new Qt(qtConfig)
    
    function createQtElement()
    {
        return qt.createQtElement()
    }
    
    function setSource(source)
    {
        // Send message to the C++ side, will trigger a source reload.
        qt.postMessage("qmlsource:" + source)
    }
    
    return {
        createQtElement : createQtElement,
        setSource : setSource
    }
}