function authenticate()
{
	var username = $('#username').val();
	var password = $('#password').val();
	if(username==='' || password==='')
	{
		$('#errordiv').html('Please Enter your username and password');
	}
	else
	{
        $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
		var formData = "username=" + username + "&password=" + password;
		console.log(formData);
		 $.ajax({
        type:'POST',
        url: 'http://mobile.yournorthcyprus.com/adminlogin.php',
        crossDomain: true,
        data:formData,
		cache:false,
       // contentType: false,
        //processData: false,

        success:function(data){
            console.log('i am in success');
            console.log(data);
            var response = data.response;
            var message = data.message;
            $.mobile.loading('hide');
            if(response==='error')
            {
            	$('#errordiv').html(message);
            }
            else
            {
                $('#global_adminusername').val(username);
                console.log($('#global_adminusername').val());
                console.log(username);
            	setCookie("username", username, 1);
            	$('#username').val('');
				$('#password').val('');
				$('#errordiv').html('');
            	redirect_to('#adminlanding');
            }

        },

        fail:function(data){
            console.log('i am in fail');
        console.log(data);
        $.mobile.loading('hide');
		redirect_to('#adminerrorpage');
        },

        error: function(data){
            console.log('i am in error');
           console.log(data);
           $.mobile.loading('hide');
           redirect_to('#adminerrorpage');
        }
    });

	}
}



function redirect_to(newPage) {
      $("body").pagecontainer("change", newPage, {transition: "pop"});
  	}

function goto_sucess(newPage,message) {
      $('#sucessmsg').html(message);
      $("body").pagecontainer("change", newPage, {transition: "pop"});
    }

 function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        return true;
    } else {
        return false;
        }
    }

function logout()
{
	setCookie("username", "", -1);
	redirect_to("#adminloginpage")
}

function loadcourseoptions()
{
	var dataurl = 'http://mobile.yournorthcyprus.com/loadcourseoptions.php';
	$.ajax({
			    url: dataurl,
			    timeout: 5000,
			    error: function(jqXHR, textStatus) {
			    	console.log(textStatus);
			    	redirect_to('#adminerrorpage');
			    },

			    fail: function(jqXHR, textStatus, errorThrown){
			    	console.log(textStatus);
			    	redirect_to('#adminerrorpage');
			    },

			    success: function (jsondata) {
                    $('#cpre').html(' <option>Select Options:</option>');
			    	   for (var i = 0; i < jsondata.length; i++) {
			    	  $('#cpre').append('<option value="' +jsondata[i].c_code.course_code +'">' +jsondata[i].c_code.course_code +'</option>');  
						console.log(jsondata[i].c_code.course_code);
			    	   }

			    	  $('#cpre').trigger("change");
					
            }


			});
}


function loadcoursecat()
{
    var dataurl = 'http://mobile.yournorthcyprus.com/course_cat.php';
    $.ajax({
                url: dataurl,
                timeout: 5000,
                error: function(jqXHR, textStatus) {
                    console.log(textStatus);
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                    console.log(textStatus);
                    redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    $('#ccat').html(' <option>Choose One:</option>');
                       for (var i = 0; i < jsondata.length; i++) {
                      $('#ccat').append('<option value="' +jsondata[i].courses_cat.category_name +'">' +jsondata[i].courses_cat.description +'</option>');  
                        console.log(jsondata[i].courses_cat.category_name);
                       }

                      $('#ccat').trigger("change");
                    
            }


            });
}

function addcourse()
{
   

    var ccode = $('#ccode').val();
    var cname = $('#cname').val();
    var ref_code = $('#ref_code').val();
    var cdscpt = $('#cdscpt').val();
    var emucrt = $('#emucrt').val();
    var ectscrt = $('#ectscrt').val();
    var cpre = $('#cpre').val();
    var ccat = $('#ccat').val();
    var lecture_hour = $('#lecture_hour').val();
    var lab_hour = $('#lab_hour').val();
    var tut_hour = $('#tut_hour').val();
    var semester_taken = $('#semester_taken').val();
    if(ccode==='' || cname==='' || ref_code==='' || cdscpt==='' || emucrt==='' || ectscrt==='' ||ccat==='Choose One:' || semester_taken==='Choose One:' || lecture_hour==='' || lab_hour==='' || tut_hour==='')
    { 
         alert('Please Fill all Information regarding the new course');
        $('#addcourseerrordiv').html('Please Fill all Information regarding the new course');
        $.mobile.silentScroll(0);
    }
    else
    {
      $('#progresspane').html('<img src="images/loading.gif" width="30" height="30">');
        var formData = "ccode=" + ccode + "&cname=" + cname+ "&cdscpt=" +
        cdscpt + "&ref_code="+ref_code+"&emucrt=" + emucrt + "&ectscrt=" +ectscrt + "&cpre=" +
        cpre + "&ccat=" +ccat +  "&semester_taken=" + semester_taken +  "&lecture_hour=" +lecture_hour+ "&lab_hour=" +
        lab_hour + "&tut_hour=" + tut_hour;
        console.log(formData);

        $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
         $.ajax({
        type:'POST',
        url: 'http://mobile.yournorthcyprus.com/addnewcourse.php',
        data:formData,
        cache:false,
       // contentType: false,
        //processData: false,

        success:function(data){
            console.log(data);
            var response = data.response;
            var message = data.message;
            $.mobile.loading('hide');

            if(response==='error')
            {
                alert(message);
            }
            else
            {
                 $('#progresspane').html('');
                document.getElementById("add_course").reset();
                goto_sucess('#adminsuccesspage',message);
            }

        },

        fail:function(data){
        console.log(data);
            $.mobile.loading('hide');

        redirect_to('#adminerrorpage');
        },

        error: function(data){
            $.mobile.loading('hide');

           console.log(data);
           redirect_to('#adminerrorpage');
        }
    });


    }
}

function addcource_category()
{
    var c_catname = $('#c_catname').val();
    var c_catdesc = $('#c_catdesc').val();

     if(c_catname==='' || c_catdesc==='')
    {
       $('#addcaterrordiv').html('Please Enter Category name and Description');
    }
    else
    {
        $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
        document.getElementById("addcoursecategory").reset();
        var formData = "c_catname=" + c_catname + "&c_catdesc=" + c_catdesc;
        console.log(formData);
         $.ajax({
        type:'POST',
        url: 'http://mobile.yournorthcyprus.com/add_course_cat.php',
         crossDomain: true,
        data:formData,
        cache:false,
       // contentType: false,
        //processData: false,

        success:function(data){
            console.log(data);
            var response = data.response;
            var message = data.message;
            $.mobile.loading('hide');

            if(response==='error')
            {
               alert(message);
            }
            else
            {
               goto_sucess('#adminsuccesspage',message);
            }

        },

        fail:function(data,textStatus,errorThrown){
        console.log(data);
          console.log(textStatus);
           console.log(errorThrown);
            $.mobile.loading('hide');

        redirect_to('#adminerrorpage');
        },

        error: function(data,textStatus,errorThrown){
           console.log(data);
           console.log(textStatus);
           console.log(errorThrown);
            $.mobile.loading('hide');
           
           redirect_to('#adminerrorpage');
        }
    });

    }
}

function loadcourseinfo()
{
    var ccode = $('#searchfield').val();
    if(ccode=='')
    {
        alert('Please Enter Course Code To Search');
    }
    else
    {
        $('#ccodefordelte').val(ccode);
        var dataurl = "http://mobile.yournorthcyprus.com/loadupdatecourse.php?c_code=" + ccode;
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Course Details... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    if(jsondata.response==="error")
                    {
                        alert(jsondata.message);
                    }
                    else
                    {
                         $('#updateformpane').html('');
                         $('#updateformpane').append(' <form id="updatecourseform"><input type="hidden" name="oldccode" id="oldccode" value="'+ccode+'" /> <label for="upccode" >Course Code:</label><input type="text" name="upupccode" id="upccode" value="'+jsondata.message.course_code +'" placeholder="Course Code"/><label for="uprefcode" >Ref Code:</label><input type="text" name="uprefcode" id="uprefcode" value="'+jsondata.message.ref_code +'" placeholder="Ref Code"/><label for="upcname">Course Title:</label><input type="text" name="upcname" id="upcname" value="'+jsondata.message.course_title+'" placeholder="Course Title"/>  <label for="upcdscpt">Course Description:</label><textarea id="upcdscpt" name="upcdscpt" placeholder="Course Description">'+jsondata.message.course_desc+'</textarea><label for="upemucrt">EMU Credit:</label><input type="range" name="upemucrt" id="upemucrt" value="'+ jsondata.message.emu_credit+'" min="0" max="10" /><label for="upectscrt">ECTS Credit:</label><input type="range" name="upectscrt" id="upectscrt" value="'+jsondata.message.ects_credit+'" min="0" max="15" /><label for="upcpre">Course Prerequisite:</label><input name="upcpre" id="upcpre" value="'+ jsondata.message.course_pre+'" placeholder="course Prerequisite" /><label for="upccat">Course Category:</label><input type="text" name="upccat" id="upccat" value="'+jsondata.message.course_cat+'" placeholder="course Category" /><label for="upsemester_taken">Semester Taken:</label><input type="number" name="upsemester_taken" id="upsemester_taken" value="' +jsondata.message.semestertaken+ '" placeholder="Semester Taken" /><label for="uplecture_hour">Lecture Hour:</label><input type="number" name="uplecture_hour" id="uplecture_hour" value="'+jsondata.message.lecture_hour+'" min="0" placeholder="Lecture Hour"/><label for="uplab_hour">Lab Hour:</label><input type="number" name="uplab_hour" id="uplab_hour" value="'+jsondata.message.lab_hour+'" min="0" placeholder="Lab Hour"/><label for="uptut_hour">Tutorial Hour:</label><input type="number" name="uptut_hour" id="uptut_hour" value="'+jsondata.message.tutorial_hour+'" min="0" placeholder="Tutorial Hour"/><input type="button" value="Update" onclick="updatecourse()" /></form>');
                    }
                   
                $.mobile.loading('hide');
                $("#updateformpane").trigger("create");
            }


            });
    }
}

function loadcoursebasicinfo()
{
    var ccode = $('#deletesearchfield').val();
    if(ccode==='')
    {
        alert('Please Enter Course Code To Search');
    }
    else
    {
        $('#ccodefordelte').val(ccode);
        var dataurl = "http://mobile.yournorthcyprus.com/loadupdatecourse.php?c_code=" + ccode;
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Course Details... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    if(jsondata.response==="error")
                    {
                        alert(jsondata.message);
                    }
                    else
                    {
                         $('#deletecoursepane').html('');
                         $('#deletecoursepane').append(' <form id="deletecourseform"><input type="hidden" name="oldccode" id="oldccode" value="'+ccode+'" /> <label for="upccode" >Course Code:</label><input type="text" name="upupccode" disabled id="upccode" value="'+jsondata.message.course_code +'" placeholder="Course Code"/><label for="upcname">Course Title:</label><input type="text" name="upcname" disabled id="upcname" value="'+jsondata.message.course_title+'" placeholder="Course Title"/>  <label for="upcdscpt">Course Description:</label><textarea id="upcdscpt" name="upcdscpt" disabled placeholder="Course Description">'+jsondata.message.course_desc+'</textarea><input type="button" value="Delete" onclick="deletecourse()" /></form>');
                    }
                   
                $.mobile.loading('hide');
                $("#deletecourses").trigger("create");
            }


            });
    }
}

function updatecourse()
{
    var ccode = $('#upccode').val();
    var cname = $('#upcname').val();
    var cdscpt = $('#upcdscpt').val();
    var emucrt = $('#upemucrt').val();
    var ectscrt = $('#upectscrt').val();
    var cpre = $('#upcpre').val();
    var ccat = $('#upccat').val();
    var lecture_hour = $('#uplecture_hour').val();
    var lab_hour = $('#uplab_hour').val();
    var tut_hour = $('#uptut_hour').val();
    var oldccode = $('#oldccode').val();
    var uprfcde = $('#uprefcode').val();
    var semester_taken = $('#upsemester_taken').val();
    if(ccode==='' || cname==='' || cdscpt==='' || emucrt==='' || ectscrt==='' ||ccat==='' || semester_taken==='' || lecture_hour==='' || lab_hour==='' || tut_hour==='' || uprfcde==='')
    {
       alert('Please Fill all Information regarding the course');
    }
    else
    {
        $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
        $('#upprogresspane').html('<img src="images/loading.gif" width="30" height="30">');
        var formData = "ccode=" + ccode + "&oldccode=" +oldccode + "&cname=" + cname+ "&cdscpt=" +
        cdscpt + "&emucrt=" + emucrt + "&ectscrt=" +ectscrt + "&cpre=" +
        cpre + "&ccat=" +ccat +  "&semester_taken=" + semester_taken +  "&lecture_hour=" +lecture_hour+ "&lab_hour=" +
        lab_hour + "&ref_code= "+uprfcde+"&tut_hour=" + tut_hour;
        console.log(formData);

         $.ajax({
        type:'POST',
        url: 'http://mobile.yournorthcyprus.com/updatecourse.php',
        data:formData,
        cache:false,
       // contentType: false,
        //processData: false,

        success:function(data){
            console.log(data);
            var response = data.response;
            var message = data.message;
            $.mobile.loading('hide');

            if(response==='error')
            {
                alert(message);
            }
            else
            {
                 $('#upprogresspane').html(''); 
                 $('#updateformpane').html('');
                goto_sucess('#adminsuccesspage',message);

            }

        },

        fail:function(data){
        console.log(data);
            $.mobile.loading('hide');

        redirect_to('#adminerrorpage');
        },

        error: function(data){
            $.mobile.loading('hide');

           console.log(data);
           redirect_to('#adminerrorpage');
        }
    });

    }
}


function deletecourse()
{
    coursecode = $('#ccodefordelte').val();
    var r = confirm("Are You Sure You want to delete this course?");
    if (r == true) {
        $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
     $.ajax({
        type:'POST',
        url: 'http://mobile.yournorthcyprus.com/delete_course.php?coursecode=' + coursecode,

        success:function(data){
            console.log(data);
            var response = data.response;
            var message = data.message;
            $.mobile.loading('hide');
            if(response==='error')
            {
               alert(message);
            }
            else
            {
               goto_sucess('#adminsuccesspage',message);
            }

        },

        fail:function(data){
        console.log(data);
           $.mobile.loading('hide');
        redirect_to('#adminerrorpage');
        },

        error: function(data){
           console.log(data);
              $.mobile.loading('hide');
           redirect_to('#adminerrorpage');
        }
    });

    }  
}

function loadstaffinfo(){
     var ccode = $('#searchstaffield').val();
    if(ccode==='')
    {
        alert('Please Enter Staff Email To Search');
    }
    else
    {
        $('#stafemaildelete').val(ccode);
        var dataurl = "http://mobile.yournorthcyprus.com/loadupdatestaff.php?staffemail=" + ccode;
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Staff Details... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    if(jsondata.response==="error")
                    {
                        alert(jsondata.message);
                    }
                    else
                    {
                         $('#updatestaffformpane').html('');
                         $('#updatestaffformpane').append('<form id="update_staff" method="post" enctype="multipart/form-data" data-ajax="false"><input type="hidden" name="oldemail" id="oldemail" value="'+ccode+'" /><label for="upstitle" >Staff Title:</label><input type="text" name="upstitle" id="upstitle" value="'+jsondata.message.title +'" required placeholder="Assoc. Prof. Dr"/><label for="upsname">First Name:</label><input type="text" name="upsname" id="upsname" value="'+jsondata.message.fname +'" required placeholder="First Name"/><label for="uplname">Last Name:</label><input type="text" name="uplname" id="uplname" value="'+jsondata.message.lname +'" required placeholder="Last Name"/><label for="upspos">Position:</label><input type="text" name="upspos" id="upspos" value="'+jsondata.message.staff_position +'" required placeholder="Position" /><label for="upemail">Email:</label><input type="email" name="upemail" id="upemail" value="'+jsondata.message.email +'" required placeholder="Email" /><label for="upofficeno">Office No:</label><input type="text" name="upofficeno" id="upofficeno" required placeholder="Office Num" value="'+jsondata.message.office_no +'"/><label for="upphone_num">Phone Number:</label><input type="text" name="upphone_num" id="upphone_num" required placeholder="Phone Num" value="'+jsondata.message.phone +'"/><input type="button" value="Update Staff" onclick="updatestaffinfoaction()" /></form>');
                    }
                   
                $.mobile.loading('hide');
                $("#updatestaffinfo").trigger("create");
            }


            });
    }
}


function updatestaffinfoaction(){
    var sttitle = $('#upstitle').val();
    var fname = $('#upsname').val();
    var lname = $('#uplname').val();
    var posi = $('#upspos').val();
    var email = $('#upemail').val();
    var office_no = $('#upofficeno').val();
    var phone = $('#upphone_num').val();
    var oldemail = $('#oldemail').val();
    if(sttitle==='' || fname==='' || lname==='' || posi==='' || email==='' ||office_no==='' || phone==='')
    {
       alert('Please Fill all Staff Information');
    }
    else
    {
        $('#upstafprogresspane').html('<img src="images/loading.gif" width="30" height="30">');
        var formData = "sttitle=" + sttitle + "&fname=" + fname+ "&lname=" +
        lname + "&posi=" + posi + "&email=" +email + "&office_no=" +
        office_no + "&phone=" +phone + "&oldemail=" +oldemail;
        console.log(formData);
        $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
         $.ajax({
        type:'POST',
        url: 'http://mobile.yournorthcyprus.com/updatestaff.php',
        data:formData,
        cache:false,
       // contentType: false,
        //processData: false,

        success:function(data){
            console.log(data);
            var response = data.response;
            var message = data.message;
             $.mobile.loading('hide');
            if(response==='error')
            {
                alert(message);
            }
            else
            {
                 $('#upstafprogresspane').html(''); 
                 $('#updatestaffformpane').html('');
                goto_sucess('#adminsuccesspage',message);

            }

        },

        fail:function(data){
        console.log(data);
         $.mobile.loading('hide');
        redirect_to('#adminerrorpage');
        },

        error: function(data){
           console.log(data);
            $.mobile.loading('hide');
           redirect_to('#adminerrorpage');
        }
    });

    }
}

function loadstaffbasicinfo(){
   var ccode = $('#searchstaffielde').val();
    if(ccode==='')
    {
        alert('Please Enter Staff Email To Search');
    }
    else
    {
        $('#estafemaildelete').val(ccode);
        var dataurl = "http://mobile.yournorthcyprus.com/loadupdatestaff.php?staffemail=" + ccode;
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Staff Details... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    console.log(jsondata);
                    if(jsondata.response==="error")
                    {
                        alert(jsondata.message);
                    }
                    else
                    {
                          $('#estafemaildelete').val(ccode);
                        $('#stfimg').attr({src:jsondata.message.photo});
                       $('#eupdatestaffformpane').show();
                         $('#sftbdetails').html(jsondata.message.title + ' ' + jsondata.message.lname + ' ' +jsondata.message.fname);
                    }
                   
                $.mobile.loading('hide');
             
            }


            });
    }
}

function findstafftodelete(){
     var ccode = $('#stafemdel').val();
    if(ccode==='')
    {
        alert('Please Enter Staff Email To Search');
    }
    else
    {
        $('#staffemailfordelte').val(ccode);
        var dataurl = "http://mobile.yournorthcyprus.com/loadupdatestaff.php?staffemail=" + ccode;
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Staff Details... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    console.log(jsondata);
                    if(jsondata.response==="error")
                    {
                        alert(jsondata.message);
                    }
                    else
                    {
                        $('#deletestaffpane').html('');
                        $('#deletestaffpane').html('<img id="stfimg" src="'+jsondata.message.photo +'" alt="staff image" width="150" height="150" ><p>'+jsondata.message.title + ' ' + jsondata.message.fname + ' ' + jsondata.message.lname +'</p><input type="button" class="ui-btn" value="Delete" onclick="deletestaffinfo()" />');
                        
                    }
                   
                $.mobile.loading('hide');
             
            }


            });
    }
}

function deletestaffinfo(){
    stafemail = $('#stafemdel').val();
    var r = confirm("Are You Sure You want to delete this Staff?");
    if (r == true) {
        $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
     $.ajax({
        type:'POST',
        url: 'http://mobile.yournorthcyprus.com/delete_staff.php?email=' + stafemail,

        success:function(data){
            console.log(data);
            var response = data.response;
            var message = data.message;
            $.mobile.loading('hide');
            if(response==='error')
            {
               alert(message);
            }
            else
            {
                 $('#deletestaffpane').html('');
               goto_sucess('#adminsuccesspage',message);

            }

        },

        fail:function(data){
        console.log(data);
        $.mobile.loading('hide');
        redirect_to('#adminerrorpage');
        },

        error: function(data){
           console.log(data);
           $.mobile.loading('hide');
           redirect_to('#adminerrorpage');
        }
    });

    }  
}

function hddiv()
{
    $('#eupdatestaffformpane').hide();
}

 function loadannouncementlist(){
    $('#updateannocemnt').hide();
    var dataurl = "http://mobile.yournorthcyprus.com/mistery.php";
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Announcement Details... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    console.log(jsondata);
                    console.log(jsondata[0].annoucement.title);
                        $('#annoucementselect1').html('');
                        $('#annoucementselect1').append('<option value="Select">Select</option>');
                        for (var i = 0; i < jsondata.length; i++) {
                             $('#annoucementselect1').append('<option value="'+jsondata[i].annoucement.id+'">'+jsondata[i].annoucement.title+'</option>');
                             
                        };
                        $('#annoucementselect1').trigger("change");
        
                $.mobile.loading('hide');
             
            }


            });
 }

function showupdateannuocementform()
{
    var value = $('#annoucementselect1').val();
    if(value==="Select"){
       return;
    }
    var dataurl = "http://mobile.yournorthcyprus.com/loadannoucemnt.php?id=" + value;
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Announcement Details... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    console.log(jsondata);
                    if(jsondata.response==="error")
                    {
                        alert(jsondata.message);
                    }
                    else
                    {
                        $('#id').val(jsondata.message.id);
                        $('#myid').val(jsondata.message.id);
                        console.log($('#id').val());
                        console.log(jsondata.message.title);
                        $('#updateannocemnt').show();
                        console.log(jsondata.message.id);
                        $('#upanntitle').val(jsondata.message.title);
                        $('#upanndetails').val(jsondata.message.details);
                      
                    }
                   
                $.mobile.loading('hide');
             
            }


            });
}

function deleteannoucemt(){
     var id = $('#annoucementselect1').val();
    var r = confirm("Are You Sure You want to delete this Announcement?");
    if (r == true) {
        $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
     $.ajax({
        type:'POST',
        url: 'http://mobile.yournorthcyprus.com/delete_announcment.php?id=' + id,

        success:function(data){
            console.log(data);
            $.mobile.loading('hide');
            var response = data.response;
            var message = data.message;

            if(response==='error')
            {
               alert(message);
            }
            else
            {
                 $('#updateannocemnt').hide();
               goto_sucess('#adminsuccesspage',message);

            }

        },

        fail:function(data){
        console.log(data);
        $.mobile.loading('hide');
        redirect_to('#adminerrorpage');
        },

        error: function(data){
           console.log(data);
           $.mobile.loading('hide');
           redirect_to('#adminerrorpage');
        }
    });

    }  
}

function loadactitylist(){
     $('#updateactivity').hide();
    var dataurl = "http://mobile.yournorthcyprus.com/loadactivitytlist.php";
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading ACtivity Details... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    console.log(jsondata);
                    console.log(jsondata[0].activity.title);
                        $('#activityselect1').html('');
                        $('#activityselect1').append('<option value="Select">Select</option>');
                        for (var i = 0; i < jsondata.length; i++) {
                             $('#activityselect1').append('<option value="'+jsondata[i].activity.id+'">'+jsondata[i].activity.title+'</option>');
                             
                        };
                        $('#activityselect1').trigger("change");
        
                $.mobile.loading('hide');
             
            }


            });
}

function showupdateactivityform(){
     var value = $('#activityselect1').val();
    if(value==="Select"){
       return;
    }
    var dataurl = "http://mobile.yournorthcyprus.com/loadactivity.php?id=" + value;
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Activity Details... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    console.log(jsondata);
                    if(jsondata.response==="error")
                    {
                        alert(jsondata.message);
                    }
                    else
                    {
                        $('#id').val(value);
                        console.log(jsondata.message.title);
                        $('#updateactivity').show();
                        $('#upacttitle').val(jsondata.message.title);
                        $('#upactdetails').val(jsondata.message.details);
                      
                    }
                   
                $.mobile.loading('hide');
             
            }


            });
}

function deleteactvity(){
      var id = $('#activityselect1').val();
    var r = confirm("Are You Sure You want to delete this Activity?");
    if (r == true) {
        $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
     $.ajax({
        type:'POST',
        url: 'http://mobile.yournorthcyprus.com/delete_activity.php?id=' + id,

        success:function(data){
            console.log(data);
            var response = data.response;
            var message = data.message;
            $.mobile.loading('hide');
            if(response==='error')
            {
               alert(message);
            }
            else
            {
                 $('#updateactivity').hide();
               goto_sucess('#adminsuccesspage',message);

            }

        },

        fail:function(data){
        console.log(data);
        $.mobile.loading('hide');
        redirect_to('#adminerrorpage');
        },

        error: function(data){
           console.log(data);
           $.mobile.loading('hide');
           redirect_to('#adminerrorpage');
        }
    });

    }  
}
function loadalbumdeletelist(){
       var dataurl = "http://mobile.yournorthcyprus.com/loadalbumlist.php";
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Album List... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    console.log(jsondata);
                    console.log(jsondata[0].album.name);
                        $('#albumtodeletelist').html('');
                        $('#albumtodeletelist').html('<ul data-role="listview">');
                        for (var i = 0; i < jsondata.length; i++) {
                             $('#albumtodeletelist').append('<li><a href="#" onclick="deletealbum('+jsondata[i].album.id+')">'+jsondata[i].album.name+'</a></li>');
                             
                        };
                        $('#albumtodeletelist').append('</ul>');
                        $('#albumtodeletelist').listview().listview('refresh');
        
                $.mobile.loading('hide');
             
            }


            });
}
function deletealbum(id){
     var r = confirm("Are You Sure You want to delete this Album?");
    if (r == true) {
        $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
     $.ajax({
        type:'POST',
        url: 'http://mobile.yournorthcyprus.com/delete_album.php?albulmid=' + id,

        success:function(data){
            console.log(data);
            var response = data.response;
            var message = data.message;
            $.mobile.loading('hide');
            if(response==='error')
            {
               alert(message);
            }
            else
            {
               goto_sucess('#adminsuccesspage',message);
                redirect_to('#gallerymanagemt');
            }

        },

        fail:function(data){
        console.log(data);
           $.mobile.loading('hide');
        redirect_to('#adminerrorpage');
        },

        error: function(data){
           console.log(data);
              $.mobile.loading('hide');
           redirect_to('#adminerrorpage');
        }
    });

    }  
}
function loadalbumlist(){
     var dataurl = "http://mobile.yournorthcyprus.com/loadalbumlist.php";
            $.ajax({
                url: dataurl,
                timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Album List... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },

                error: function(jqXHR, textStatus) {
                    $.mobile.loading('hide');
                    redirect_to('#adminerrorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                     $.mobile.loading('hide');
                     redirect_to('#adminerrorpage');
                },

                success: function (jsondata) {
                    console.log(jsondata);
                    console.log(jsondata[0].album.name);
                        $('#albumdropdnw').html('');
                        $('#albumdropdnw').append('<option value="Select">Select</option>');
                        for (var i = 0; i < jsondata.length; i++) {
                             $('#albumdropdnw').append('<option value="'+jsondata[i].album.id+'">'+jsondata[i].album.name+'</option>');
                             
                        };
                        $('#albumdropdnw').trigger("change");
        
                $.mobile.loading('hide');
             
            }


            });
}

 $(function() {

            $("form#add_staff").submit(function(){
                console.log("uploading...");
                var formData = new FormData($(this)[0]);
                console.log(formData);
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/add_staff.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        var response = data.response;
                        var message = data.message;
                        $.mobile.loading('hide');
                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                           goto_sucess('#adminsuccesspage',message);
                        document.getElementById("add_staff").reset();
                        }

                    },
                    error: function(data){
                         console.log(data);
                         $.mobile.loading('hide');
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });

                return false;
            });

              $("form#upload_staffphoto").submit(function(){
                var formData = new FormData($(this)[0]);
                console.log(formData);
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/update_staff_photo.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        var response = data.response;
                        var message = data.message;
                        var imgpath =data.imgpath;
                        $.mobile.loading('hide');
                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                           $('#stfimg').attr({src:imgpath});
                           goto_sucess('#adminsuccesspage',message);
                        }
                        document.getElementById("upload_staffphoto").reset();

                    },
                    error: function(data){
                         console.log(data);
                         $.mobile.loading('hide');
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                    });
                return false;
            });

             $("form#add_annoucemnt").submit(function(){
                var formData = new FormData($(this)[0]);
                console.log(formData);
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/add_annoucemnt.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        $.mobile.loading('hide');
                        var response = data.response;
                        var message = data.message;

                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                           goto_sucess('#adminsuccesspage',message);
                            document.getElementById("add_annoucemnt").reset();
                        }
                       

                    },
                    error: function(data){
                         console.log(data);
                         $.mobile.loading('hide');
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                    });
                return false;
            });
            
     $("form#add_activity").submit(function(){
                var formData = new FormData($(this)[0]);
                console.log(formData);
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/add_activity.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        var response = data.response;
                        var message = data.message;
                        $.mobile.loading('hide');
                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                           goto_sucess('#adminsuccesspage',message);
                            document.getElementById("add_activity").reset();
                        }
                       

                    },
                    error: function(data){
                         console.log(data);
                         $.mobile.loading('hide');
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                    });
                return false;
            });


        $("form#update_annoucemnt").submit(function(){
                var formData = new FormData($(this)[0]);
                console.log(formData);
                console.log($('#id').val());
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/update_annoucemnt.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        var response = data.response;
                        var message = data.message;
                        $.mobile.loading('hide');
                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                           goto_sucess('#adminsuccesspage',message);
                            document.getElementById("update_annoucemnt").reset();
                            $('#updateannocemnt').hide();
                        }
                       

                    },
                    error: function(data){
                         console.log(data);
                         $.mobile.loading('hide');
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                    });
                return false;
            });

         $("form#update_activity").submit(function(){
                var formData = new FormData($(this)[0]);
                console.log(formData);
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/update_activity.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        $.mobile.loading('hide');
                        var response = data.response;
                        var message = data.message;

                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                           goto_sucess('#adminsuccesspage',message);
                            document.getElementById("update_activity").reset();
                            $('#updateactivity').hide();
                        }
                       

                    },
                    error: function(data){
                         console.log(data);
                         $.mobile.loading('hide');
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                    });
                return false;
            });
    
         $("form#addalbum").submit(function(){
                var formData = new FormData($(this)[0]);
                console.log(formData);
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/add_album.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        $.mobile.loading('hide');
                        var response = data.response;
                        var message = data.message;
                        $.mobile.loading('hide');
                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                           goto_sucess('#adminsuccesspage',message);
                            $('#albumname').val('');
                           
                        }
                       

                    },
                    error: function(data){
                         console.log(data);
                         $.mobile.loading('hide');
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                    });
                return false;
            });
             $("form#addpicture_albul").submit(function(){
                var id= $("#albumdropdnw option:selected").val();
                console.log(id);
                $('#albulmid').val(id);
                console.log("below is the id");
                console.log($('#albulmid').val());
                var formData = new FormData($(this)[0]);
                console.log(formData);
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/add_picture_to_album.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        var response = data.response;
                        var message = data.message;
                        $.mobile.loading('hide');
                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                           goto_sucess('#adminsuccesspage',message);
                             document.getElementById("addpicture_albul").reset();
                           
                        }
                       

                    },
                    error: function(data){
                         console.log(data);
                         $.mobile.loading('hide');
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                    });
                return false;
            });
            
            $("form#addnadmin").submit(function(){
                var formData = new FormData($(this)[0]);
                console.log(formData);
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/add_new_admin.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        var response = data.response;
                        var message = data.message;
                        $.mobile.loading('hide');
                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                           goto_sucess('#adminsuccesspage',message);
                             document.getElementById("addnadmin").reset();
                           
                        }
                       

                    },
                    error: function(data){
                        $.mobile.loading('hide');
                         console.log(data);
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                    });
                return false;
            });


             $("form#forgetpasswordform").submit(function(){
                var formData = new FormData($(this)[0]);
                console.log(formData);
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/reset_password.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        var response = data.response;
                        var message = data.message;
                        $.mobile.loading('hide');
                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                          $('#forgetpasserror').html(message);
                        document.getElementById("forgetpasswordform").reset();
                        }

                    },
                    error: function(data){
                         console.log(data);
                         $.mobile.loading('hide');
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });

                return false;
            });
    
        
         $("form#chmpsadmin").submit(function(){
            var username = $('#global_adminusername').val();
            console.log(username);
            $('#chnusername').val(username);
                var formData = new FormData($(this)[0]);
                console.log(formData);
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request, Please wait...",
                 textonly: true,
                 textVisible: true
                    });
                $.ajax({
                    url: 'http://mobile.yournorthcyprus.com/change_adminpass.php',
                    type: 'POST',
                    data: formData,
                   // async: false,
                    success: function (data) {
                        console.log(data);
                        var response = data.response;
                        var message = data.message;
                        $.mobile.loading('hide');
                        if(response==='error')
                        {
                           alert(message);
                        }
                        else
                        {
                           goto_sucess('#adminsuccesspage',message);
                             document.getElementById("chmpsadmin").reset();
                           
                        }
                       

                    },
                    error: function(data){
                        $.mobile.loading('hide');
                         console.log(data);
                         redirect_to('#adminerrorpage');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                    });
                return false;
            });

        });