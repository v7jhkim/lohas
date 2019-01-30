// main.js
// 자작 페이드 비쥬얼 배경
// $(function(){

//     var img_num = 1; // 이미지번호
//     var duration= 2000;

//     setInterval(function(){
//         //이미지 번호 증가
//         img_num++;
//         if(img_num>4) {img_num=1;}
//         $("#content .main_visual")
//         .fadeTo(500,0, function(){
//             $(this).css({backgroundImage:"url(../images/main-visual"+img_num+".jpg)"})
//         })
//         .fadeTo(500,1)
        
//     },duration)

//     // 메인 헤더 애니메이션
//     $("#main_header").animate({marginTop:"90px"},1000)

    
// })

// jquery VEGAS BG Slider Show 플러그인
$(function(){

    $("#content .main-visual").vegas({
        slides: [
            {src: "/images/main-visual1.jpg"},
            {src: "/images/main-visual2.jpg"},
            {src: "/images/main-visual3.jpg"},
            {src: "/images/main-visual4.jpg"},
        ]
    })
})