document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});


var settings = {

  "url": "https://api.covid19api.com/summary",
  "method": "GET",
  "timeout": 0,

}

var state_district_wise = {
  "url": "https://api.covid19india.org/state_district_wise.json",
  "method": "GET",
  "timeout": 0,
};


var state_data = {
  "url": "https://covid-india-cases.herokuapp.com/states",
  "method": "GET",
  "timeout": 0,
};


$(document).ready(function(){
      $.ajax({
      type:"GET",
      url:"https://api.covid19api.com/summary",
      dataType:"json",

      beforeSend: function(){

      $("#data_inside").css("opacity","0.2")
      $(".heading").css("opacity","0.2")
      $("#loader").show();

        
      },
      complete:function(){
        $("#loader").hide();
        $("#data_inside").css("opacity","1")
        $(".heading").css("opacity","1")
      },

      success: function(data){
        var india=data
        if (data.Global.NewConfirmed != "0"){
          $("#NewConfirmed").html("<b>New Confirmed:</b>"+data.Global.NewConfirmed+"<hr>");
        }else{
          $("#NewConfirmed").html("<b>New Confirmed:</b>"+"Not Availabe"+"<hr>");
        };
        if (data.Global.NewDeaths != "0"){                
        $("#NewDeaths").html("New Deaths : "+data.Global.NewDeaths+"<hr>")
      }else{
        $("#NewDeaths").html("New Deaths : "+"Not Availabe"+"<hr>")
      };
        if (data.Global.NewRecovered != "0"){
        $("#NewRecovered").html("<b>New Recovered : "+data.Global.NewRecovered+"<hr>") 
        }else{
        $("#NewRecovered").html("<b>New Recovered : "+"Not Availabe"+"<hr>") 

        };

        if (data.Global.TotalConfirmed != "0"){                
        $("#TotalConfirmed").html("Total Confirmed : "+data.Global.TotalConfirmed+"<hr>") 
        }else{
         $("#TotalConfirmed").html("Total Confirmed : "+"Not Availabe"+"<hr>") 

        };

        if (data.Global.TotalDeaths != "0"){         
        $("#TotalDeaths").html("Total Deaths : "+data.Global.TotalDeaths+"<hr>")
      }else{
        $("#TotalDeaths").html("Total Deaths : "+"Not Availabe"+"<hr>")

      };
        if (data.Global.TotalRecovered != "0"){
        $("#TotalRecovered").html("Total Recovered : "+data.Global.TotalRecovered+"<hr>")
      }else{
        $("#TotalRecovered").html("Total Recovered : "+"Not Availabe"+"<hr>")
      };

      },

      error:function(){
        $(".no_internet").show()
        $("#btn_error").show()
      },

    });



                $.ajax(settings).done(function (data) {
                $("#btn_india").click(function(){
                $(".heading").html("INDIA")

                if (data.Countries[101].NewConfirmed != "0"){
                  $("#NewConfirmed").html("<b>New Confirmed :</b>"+data.Countries[101].NewConfirmed+"<hr>")

                }else{
                  $("#NewConfirmed").html("<b>New Confirmed :</b>"+"Not Availabe"+"<hr>")

                };
                
                if (data.Countries[101].NewDeaths!= "0"){
                $("#NewDeaths").html("New Deaths : "+data.Countries[101].NewDeaths+"<hr>")
              }else{

               $("#NewDeaths").html("New Deaths : "+"Not Availabe"+"<hr>")
              };

               if (data.Countries[101].NewDeaths!= "0"){
                $("#NewRecovered").html("<b>New Recovered : "+data.Countries[101].NewRecovered+"<hr>")
                 }else{
                $("#NewRecovered").html("<b>New Recovered : "+"Not Availabe"+"<hr>")
                 };
                $("#TotalConfirmed").html("Total Confirmed : "+data.Countries[101].TotalConfirmed+"<hr>")
                 
                $("#TotalDeaths").html("Total Deaths : "+data.Countries[101].TotalDeaths+"<hr>")
                 
                $("#TotalRecovered").html("Total Recovered : "+data.Countries[101].TotalRecovered+"<hr>")


                  });

                $('#btn_world').click(function() {
                         location.reload();
                             });
                 });
                $('#btn_error').click(function() {
                         location.reload();
                             });
                 

                $(document).ready(function(){
                      $("#btn_jharkhand").on("click",function(){

                          $.ajax({
                            type:"GET",
                            url:"https://covid-india-cases.herokuapp.com/states",
                            dataType:"json",

                            beforeSend: function(){
                              $("#data_inside").css("opacity","0.2")
                              $(".heading").css("opacity","0.2")
                              $("#loader").show();
                              
                            },
                            complete:function(){
                              $("#loader").hide();
                              $("#data_inside").css("opacity","1")
                              $(".heading").css("opacity","1")
                            } 

                          });

                  
                      $("#btn_india").css("visibility","hidden")
                      $("#btn_world").css("visibility","hidden")
                      $("#btn_jharkhand").css("visibility","hidden")
                      $.ajax(state_data).done(function (state) {
                        console.log(state)
                        var jharkhand_data =state[14]


                        active_cases_jharkhand = parseInt(jharkhand_data.noOfCases) - parseInt(jharkhand_data.cured);

                        
                    
                                    $("#NewConfirmed").html("Active Cases : "+active_cases_jharkhand+"<hr>")
                 

                                    $("#NewDeaths").empty()
                                    $("#TotalConfirmed").html("<b>Total Cases : </b>"+jharkhand_data.noOfCases+"<hr>")
                                     
                                    $("#NewRecovered").empty()
                                     
                                    $("#TotalDeaths").html("Total Deaths : "+jharkhand_data.deaths+"<hr>")
                                     
                                    $("#TotalRecovered").html("Total Recovered : "+jharkhand_data.cured+"<hr>")
                    $(".heading").html("Jharkhand")
                    $("#btn_more").css("visibility","visible")

                      });
                  });

                    });
            
               	 


  $("#btn_more").attr("href","jharkhand.html")

  $.ajax(state_district_wise).done(function (response) {
 
  
   $.each(response.Jharkhand.districtData, function(key,value){
          
          $("#Table_district").append("<tr><td><b>"+key+"</b></td><td>"+value.active+"</td><td>"+value.confirmed+"</td><td>"+value.deceased+"</td><td>"+value.recovered+"</td></tr>")

    })
 });
   });
