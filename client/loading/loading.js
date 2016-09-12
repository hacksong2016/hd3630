Template.loading.onRendered(function(){
  loading.show();
 
});
loading = {
  show:function(){
    $("#loadding").fadeIn(300);
  },
  hide:function(){
    $("#loadding").fadeOut(300);
  }
}