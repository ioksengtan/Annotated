$(document).ready(function(e) {
	directory = {
		"home":{

		},
		"website":{
			"Stratechery":{
				0:{
					"title":"The 2019 Stratechery Year in Review",
					"link":"https://stratechery.com/2019/the-2019-stratechery-year-in-review/"

				}
			}
		},
		"podcast":{

		}
	}

	curr_dir = {}
	curr_dir.type = "website"
	curr_dir.source = "Stratechery"
	curr_dir.id = 0

	var display_dir = function(curr_dir){
		console.log(curr_dir)
	}
	var editor = CodeMirror.fromTextArea(document.getElementById("text-input"), {
	        lineNumbers: true,
			lineWrapping: true,
			//readOnly: true
	    }
	);
	editor.setSize("100%","100%");
	var editor_transcript = CodeMirror.fromTextArea(document.getElementById("podcast_transcript"), {
	        lineNumbers: true,
			lineWrapping: true,
			//readOnly: true
	    }
	);
	editor_transcript.setSize("100%","100%");
	
}
)
