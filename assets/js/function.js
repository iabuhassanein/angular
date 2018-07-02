// $( ".n-clickj" ).click(function() {
//   $( ".hide-mk" ).toggle( "slow" );
// });
// $( ".btn-togg-pop" ).click(function() {
//   $( ".popup-ty" ).fadeIn( "slow" );
// });

// $( ".curs-po" ).click(function() {
//   $( this ).parent().find( ".accordion-section-content" ).toggle( "fast" );
// });

// $(function() {  
// $(".add-btn-m").click(function() {  
// var textim = $( '.inp-yu-r' ).val();
// var textimn = $( "select.select-oi" ).val();
// $(".ner-nm").find('tbody')
//     .append($('<tr>')
//         .append($('<th>')
//                 .text('Image cell')
//             )
//                     .append($('<th>')
//                .text(textim)
//            )
//                     .append($('<th>')
//                 .text(textimn)
//             )
//                     .append($('<th>')
//                 .text(textimn)
//             )
//                     .append($('<th>')
//                 .text('Image cell')
//             )
//                     .append($('<th>')
//                 .text('Image cell')
//             )
//                     .append($('<th>')
//                 .text('Image cell')
//             )
//                     .append($('<th>')
//                 .html('<a href="#">add info</a> / <a href="#">remove</a>')
//             )
//         )
//   });
// });


// $(".tags-in").tagsinput('items');

// $(function() {                       
//   $("button.appl").click(function() {  
//     $(".popup-we").addClass("active-il");    
//   });
// });
// $(function() {                       
//   $(".cancel-btn").click(function() {  
//     $(".popup-we").removeClass("active-il");    
//   });
// });

// // $(document).ready(function() {
// //    function close_accordion_section() {
// //        $('.accordion .accordion-section-title').removeClass('active');
// //        $('.accordion .accordion-section-content').slideUp(400).removeClass('open');
// //    }
// //    $('.accordion-section-title').click(function(e) {
// //        var currentAttrValue = $(this).attr('href');
// // 
// //        if($(e.target).is('.active')) {
// //            close_accordion_section();
// //        }else {
// //            close_accordion_section();
// //            $(this).addClass('active');
// //            $('.accordion ' + currentAttrValue).slideDown(400).addClass('open'); 
// //        }
// // 
// //        e.preventDefault();
// //    });
// //});

// var canvas = document.getElementById('myChart');
// var data = {  
//     labels: ["TERM 153", "TERM 152-153", "TERM 153", "TERM 152-153", "TERM 153", "TERM 152-153", "TERM 153"],
//     datasets: [
//         {
//             label: "My First dataset",
//             fill: false,
//             lineTension: 0.1,
//             backgroundColor: "rgba(75,192,192,0.4)",
//             borderColor: "#00d968",
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: "rgba(75,192,192,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(75,192,192,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             pointRadius: 5,
//             pointHitRadius: 10,
//             data: [65, 59, 80, 60, 56, 55, 40],
//         }
//     ]
// };

// var option = {
//         legend: {
//     	display: false
//     },
// 	showLines: true
// };
// var myLineChart = Chart.Line(canvas,{
// 	data:data,
//   options:option
// });

// $('.selectpicker').selectpicker({});
// $(document).ready(function () {

//     $("input[type=checkbox]").on("change", function () {
//         console.log('change');
//         if ($(this).is(':checked')) {
//             $(this).parent().parent().parent().addClass('active');
//         } else {

//             $(this).parent().parent().parent().removeClass('active');

//         }
//     });
// });