 

//
// This script is generated by nacldeployqt as a part of the standard
// Qt deployment. It can be used either as-is or as a basis for a
// custom deployment solution. Note that some parts of this script
// (such as handleMessageEvent) is required by Qt.
//
// Usage:
//
// - Create and configure the Qt controller object:
//  var qt = new Qt({
//      src : "myapp.nmf",
//      type : "application/pnacl",
//   });
//
// - Create Qt/NaCl <embed> element, add it to the DOM, call load()
//  var qtEmbed = qt.createQtElement();
//  topLevelElement.appendChild(qtEmbed);
//  qt.load()
//
// - Post messages (will end up in QPepperInstance::HandleMessage)
//  qt.postMessage(message)
//
// Additional supported Qt constructor config keys
//   query           : Query string. Qt will parse this for environment variables.
//   isChromeApp     : enable Chrome Application package mode
//

function Qt(config) {
    var self = this;
    self.config = config;
    self.embed = undefined;
    self.listener = undefined;

// Utility function for splitting Url query parameters
// ("?Foo=bar&Bar=baz") into key-value pars.
function decodeQuery(query) {
    if (query === undefined)
        return {}
    var vars = query.split('&');
    var keyValues = {}
    for (var i = 0; i < vars.length; i++) {
        // split key/value on the first '='
        var parts = vars[i].split(/=(.+)/);
        var key = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts[1]);
        if (key && key.length > 0)
            keyValues[key] = value;
    }
    return keyValues;
}

function copyToClipboard(content)
{
    var copySource = document.createElement("div");
    copySource.contentEditable = true;
    var activeElement = document.activeElement.appendChild(copySource).parentNode;
    copySource.innerText = content;
    copySource.focus();
    document.execCommand("Copy", null, null);
    activeElement.removeChild(copySource);
}

function pasteFromClipboard()
{
    var pasteTarget = document.createElement("div");
    pasteTarget.contentEditable = true;
    var activeElement = document.activeElement.appendChild(pasteTarget).parentNode;
    pasteTarget.focus();
    document.execCommand("Paste", null, null);
    var content = pasteTarget.innerText;
    activeElement.removeChild(pasteTarget);
    return content;
}

// Qt message handler
function handleMessageEvent(messageEvent)
{
    // Expect messages to be in the form "tag:message",
    // and that the tag has a handler installed in the
    // qtMessageHandlers object.
    //
    // As a special case, messages with the "qtEval" tag
    // are evaluated with eval(). This allows Qt to inject
    // javaScript into the web page, for example to install
    // message handlers.

    if (this.qtMessageHandlers === undefined) {
        this.qtMessageHandlers = {}
        // Install message handlers needed by Qt:
        this.qtMessageHandlers["qtGetAppVersion"] = function(url) {
            embed.postMessage("qtGetAppVersion: " + navigator.appVersion);
        };
        this.qtMessageHandlers["qtOpenUrl"] = function(url) {
            window.open(url);
        };
        this.qtMessageHandlers["qtClipboardRequestCopy"] = function(content) {
            console.log("copy to clipbard " + content);
            copyToClipboard(content);
        };
        this.qtMessageHandlers["qtClipboardRequestPaste"] = function() {
            var content = pasteFromClipboard();
            console.log("paste from clipboard " + content);
            embed.postMessage("qtClipboardtPaste: " + content);
        };
    }

    // Give the message handlers access to the nacl module.
    var embed = self.embed

    var parts = messageEvent.data.split(/:(.+)/);
    var tag = parts[0];
    var message = parts[1];

    // Handle "qt" messages
    if (tag == "qtEval") {
        // "eval()" is not allowed for Chrome Apps
        if (self.config.isChromeApp !== undefined && !self.config.isChromeApp)
            eval(message)
    } else {
        if (this.qtMessageHandlers[tag] !== undefined)
            this.qtMessageHandlers[tag](message);
    }
}

function loadScript(src, onload)
{
    var script = document.createElement('script')
    script.src = src
    script.onload = function () {
        onload()
    };
    document.head.appendChild(script); //or something of the likes
}

// Create Qt container element, possibly re-using existingElement
function createQtElement(existingElement)
{
    var element
    if (config.type == "emscripten")
        element = createEmscriptenElement(existingElement)
    else
        element = createNaClElement(existingElement)
    return element
}

function createNaClElement(existingElement)
{
    // Create NaCl <embed> element.
    var embed = document.createElement("EMBED");
    embed.setAttribute("class", "qt-nacl-embed");
    embed.setAttribute("src", self.config.src);
    embed.setAttribute("type", self.config.type);

    // Decode and set URL query string values as attributes on the embed tag.
    // This allows passing for example ?QSG_VISUALIZE=overdraw
    var queryHash = decodeQuery(self.config.query);
    for (var key in queryHash) {
        if (key !== undefined)
            embed.setAttribute(key, queryHash[key])
    }

    // Create container div which handles load and message events
    var listener = existingElement || document.createElement("div");
    listener.className = "qt-container"
    listener.addEventListener('message', handleMessageEvent, true);
    listener.appendChild(embed);
    listener.embed = embed;

    self.embed = embed;
    self.listener = listener;

    return listener;
}

function createEmscriptenElement(existingElement)
{
    var listener = existingElement || document.createElement("div");
    listener.className = "qt-container"
    listener.addEventListener('message', handleMessageEvent, true);
    
    self.embed = listener;
    self.listener = listener;
    return listener;
}

function load()
{
    // for emscripten loading starts after the element has
    // been added to the DOM.
    if (config.type == "emscripten")
        loadEmscripten()
}

function loadEmscripten()
{
    var width = self.listener.offsetWidth
    var height = self.listener.offsetHeight

    var embed = document.createElement("div");
    self.listener.appendChild(embed);
    self.listener.embed = embed;

    loadScript(config.src, function(){
        CreateInstance(width, height, embed);
        embed.finishLoading();
    })
}

function postMessage(message) {
    self.embed.postMessage(message)
}

// return object with public API
return {
    createQtElement : createQtElement,
    load : load,
    postMessage : postMessage
}

} // function Qt

