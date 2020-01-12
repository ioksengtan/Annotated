  function mode_edit(){
	  $('#div_edit').show();
	  $('#div_view').hide();
  }

  function mode_view(){
	  $('#div_edit').hide();
	  $('#div_view').show();
  }

function update(){
  $('#save_state').text('[pending]')
	$.post(apiAnnotates,
		{
			"command": "commandInsertAnnotate",			
			"title":$('#input_title').val(),			
			"link":$('#input_link').val(),
			"tag":$('#input_tag').val(),
			"date":$('#input_date').val(),
			"annotate":editor.doc.getValue(),
			"annotate_date":"annotate_date",
			"is_delete":0			
        },function(data){
			//console.log(data);
      $('#save_state').text('[Saved]')
			//let table_json = data;
			//table = new Table(table_json);
			//render_html.render_list_html_from_array($('#website_list'),table.get_col_by_header('title'), table.get_col_by_header('id'))
			//replaceText(editor, table.get_col_by_header('annotate')[table.get_col_by_header('title').indexOf('@index')]);
		})

}

function insertTextAtCursor(editor, text) {
    var doc = editor.getDoc();
    var cursor = doc.getCursor();
    doc.replaceRange(text, cursor);
}

function replaceText(editor, text) {
    var doc = editor.getDoc();
    doc.setValue(text);
}

async function getClipboardContents(idx) {
  try {
	 //console.log('getClipboardContents');
    for (var i = 0; i < event.clipboardData.items.length; i++) {
      var item = event.clipboardData.items[i];
      if (item.type.indexOf("image") != -1) {
        const blob = await item.getAsFile();

        ConvertImgToBase64(blob).then(data => {
          post_to_imgur(idx, "https://api.imgur.com/3/image", data);
        });
      } else if (item.type.indexOf("plain") != -1) {
        // ignore not images
        const pasteString = await event.clipboardData.getData("Text");
        //let objDivEdit = document.getElementById("divEditContent");
        //objDivEdit.children[idx].children[1].innerHTML = pasteString;
      }
    }
  } catch (e) {
    console.error(e, e.message);
  }
}
function post_to_imgur(idx, path, imgData) {
  //let token = $("#fun6_clientId").val();
  let client_id = "5c4294468820af1";
  if (client_id && client_id !== "") {
    $.ajax({
      type: "POST",
      url: path,
      headers: {
        Authorization: "Client-ID " + client_id //放置你剛剛申請的Client-ID
        //Authorization: "Bearer " + token
      },
      mimeType: "multipart/form-data",
      data: { image: imgData.split(",")[1] },
      form: {
        image: imgData,
        type: "base64"
      },
      success: function(data) {
        //let objEdit = document.getElementById("divEditContent").children[idx]
        // .children[1];
        let jsonData = JSON.parse(data);
        //objEdit.innerHTML = jsonData.data.link;
        //editContent(objEdit);
		insertTextAtCursor(editor, "![]("+jsonData.data.link+")");
      },
      error: function(data) {
        let result = JSON.parse(data.responseText);
        alert(result.data.error);
      }
    });
  } else {
    alert("Client ID can't be empty");
  }
}

function ConvertImgToBase64(file) {
  var result = new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
  return result;
}



$(document).ready(function(e) {
	url_query = window.location.search;
	let indexUrlHome = window.location.href.split('/').indexOf('Annotated')
	annotate_type = window.location.href.split('/')[indexUrlHome+1];
	annotate_source = window.location.href.split('/')[indexUrlHome+2];
	render_html = new Render_html;


	if(url_query == ""){
		console.log('index');
		$('#div_edit').show();
		$('#div_iframe').hide();
		$('#div_main').show();
		$('#div_view').hide();

	}else{ // load annotates for specific id
		$('#welcome').hide();
		url_queries = url_query.split('?')[1].split('&');
		num_url_query = url_queries.length;
		dict_queries = {};
		if(num_url_query > 0){
			for(i = 0;i<num_url_query;i++){
				dict_queries[url_queries[i].split('=')[0]] = url_queries[i].split('=')[1];
			}
		}
		if (Object.keys(dict_queries).length > 0){
			console.log('have queries');
		}
		if( 'id' in dict_queries){
			$.get(apiAnnotates,
			{
				//"command": "commandGetAnnotates",
				"command": "commandGetAnnotateById",
				"id": parseInt(dict_queries['id'])
			},function(data){
				console.log(data);
				table_json = data;
				table = new Table(table_json);
				//table.get_col_by_header('link')
				render_html.render_iframe_html_from_link($('#iframe'),table.get_col_by_header('link')[0])
				replaceText(editor, table.get_col_by_header('annotate')[0])
				$('#input_link').val(table.table_json.data[0][table.table_json.headers.indexOf('link')])
				$('#input_title').val(table.table_json.data[0][table.table_json.headers.indexOf('title')])
				$('#input_date').val(table.table_json.data[0][table.table_json.headers.indexOf('date')])
			})
		}else{
			console.log('there is no id in queries');
		}
	}

	curr_dir = {}
	curr_dir.type = "website"
	curr_dir.source = "Stratechery"
	curr_dir.id = 0

	var display_dir = function(curr_dir){
		console.log(curr_dir)
	}

	editor = CodeMirror.fromTextArea(document.getElementById("text-input"), {
	        lineNumbers: true,
			lineWrapping: true,
			//readOnly: true
	    }
	);
	editor.setSize("100%","100%");

		editor.on("paste", async e => {
		//e.preventDefault();
		getClipboardContents(0);
  });



  function createStorageKey(file) {
    var date = new Date()
    var day = date.toISOString().slice(0,10)
    var name = date.getTime() + "-" + file.name
    return [ "tmp", day, name ].join("/")
  }

  function createFormData(key, file) {
    var data = new FormData()
    data.append("key", key)
    data.append("Content-Type", file.type)
    data.append("file", file)
    return data
  }



}
)
