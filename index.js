let cardId="card";

let localAdapter={
    saveCart:function(obj){
        var stringified =JSON.stringify(obj);
        localStorage.setItem(cardId,stringified);
        return true;
    },
    getCard:function(){
        return JSON.parse(localStorage.getItem(cardId));
    },
    clearCard: function(){
        localStorage.removeItem(cardId);
    }
};
let ajaxAdapter={
    saveCart: function(obj){
        var stringified=JSON.stringify(obj);
    },
    getCard:function(){
        return JSON.parse(data);
    },
    clearCard:function(){

    }
};

let storage=localAdapter;

let helpers={
    getHtml:function(id){
    return document.getElementById(id).innerHTML;
    
},
setHtml: function (id,html) {
    document.getElementById(id).innerHTML=html;
    return true;
},
itemData: function(obj){

}
}
