window.addEventListener('load',function()
{
    console.log("entering...");
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(success,failure);
    }

    function success(position) {
        addressref=document.getElementById("address");

        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        console.log(position.coords.altitude);
        console.log(position.coords.accuracy);
        console.log(position.coords.altitudeAccuracy);
        console.log(position.coords.speed);
        //  var sectionref = document.getElementById("geoinfo");
        //   sectionref.innerHTML =
        //      "<p> Latitude=<mark>" + position.coords.latitude + "</mark></p><br/>" +
        //     "<p> Longitude=<mark>" + position.coords.longitude + "</mark></p>";

        var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({latLng: latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results);
                if (results[1]) {
                    var arrAddress = results;
                    console.log(results);
                    i=0;
                    addressref.value="";
                    for(var address in arrAddress )
                    {

                        console.log(arrAddress[address]);
                        if (i==1)
                        {
                            //console.log(arrAddress[address]);
                            // if (arrAddress[address].types[0] == "locality") {
                            addressref.value= arrAddress[address].formatted_address;
                            console.log("City: " + arrAddress[address].formatted_address);
                            itemLocality = arrAddress[address].address_components[0].long_name;
                            console.log( itemLocality );
                            // }
                        }
                        i++;
                    }



                } else {
                    alert("No results found");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });

        googleloc = new google.maps.LatLng
        (position.coords.latitude,position.coords.longitude);

        //alert(googleloc);
        var mapoptions={
            center:googleloc,
            zoom:15,
            mapTypeId:google.maps.MapTypeId.SATELLITE,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            },
            mapTypeControl:true,
            mapTypeControlOptions:google.maps.MapTypeControlStyle.DEFAULT

        };

        var gmaparea=document.getElementById("maparea");
        gmap = new google.maps.Map(gmaparea,mapoptions);
        marker = new google.maps.Marker
        ({
            position:googleloc,
            map:gmap,
            title:"I am Here"

        });
        // alert("done");

    }
    function failure(err)
    {
        alert(err);
    }


    var submitRef=document.getElementById("submit");
    submitRef.addEventListener('click',function()
    {
        var firstName=document.getElementById("firstName").value;
        var lastName=document.getElementById("lastName").value;
        var dob=document.getElementById("dob").value;
        var email=document.getElementById("email").value;
        var country =document.getElementById("country").value;
        var gender= document.querySelector('input[name="gender"]:checked').value;


        var photoRef = document.getElementById("photo");
        var fileType = /image.*/;
        var totalFiles = photoRef.files.length;
        console.log(totalFiles);
        for (var i=0; i<totalFiles;i++)
        {
            console.log("Entered inside the loop");
            if(photoRef.files[i].type.match(fileType))
                console.log("Image file");
                store(i,photoRef.files[i]);

        }

        window.localStorage.setItem("FirstName", firstName);
        window.localStorage.setItem("LastName", lastName);
        window.localStorage.setItem("DOB", dob);
        window.localStorage.setItem("Gender", gender);
        window.localStorage.setItem("Email", email);
        window.localStorage.setItem("Country", country);

        console.log("First Name"+"->"+firstName);
        console.log("Last Name"+"->"+lastName);
        console.log("DOB"+"->"+dob);
        console.log("Email"+"->"+email);
        console.log("Country"+"->"+country);
        console.log("Gender"+"->"+gender);

    });

    function store(i, file)
    {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload=function ()
        {
            window.localStorage.setItem("photo" + i, fileReader.result);
        }


    }





    //stop refreshing the page
    // return false;

})
