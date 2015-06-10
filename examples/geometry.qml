import QtQuick 2.4
import QtQuick.Window 2.2
 
Rectangle {
    Column {
        anchors.centerIn : parent
        spacing : 15
        Text {
            text : "This example shows how Qt Screen and <embed> element geometry relate. Change the browser zoom!"
            width : 300
            wrapMode : Text.WordWrap
        }
        Text {
            text : "Screen width " + Screen.height + " height " + Screen.width + " devicePixelRatio " + Screen.devicePixelRatio
        }
    }
}