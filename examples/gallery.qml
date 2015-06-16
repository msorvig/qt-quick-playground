import QtQuick 2.1
import QtQuick.Layouts 1.1

Rectangle {
    GridLayout {
        id: grid
        anchors.fill: parent
        rows : 2
        columns : 2

	    Image {
	        Layout.fillHeight: true
		    Layout.fillWidth: true
            fillMode : Image.PreserveAspectCrop
            source : "data/daisy.jpg"
        }
	    Image {
            Layout.fillHeight: true
		     Layout.fillWidth: true
             fillMode : Image.PreserveAspectCrop
             source : "data/wake.jpg"
        }
	    Image {
            Layout.fillHeight: true
            Layout.fillWidth: true
            fillMode : Image.PreserveAspectCrop
            source : "data/forest.jpg"
        }
	    Image {
            Layout.fillHeight: true
            Layout.fillWidth: true
            fillMode : Image.PreserveAspectCrop
            source : "data/clouds.jpg"
        }
    }
}
