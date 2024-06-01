const whiteList=["http://localhost:3001","http://localhost:3002"]
const corrseOptions={
    origin:function(origin,callBack) {
        console.log(origin,"origin");
        if (whiteList.indexOf(origin)!==-1){
            callBack(null,true); //first call back is error and the other is boolean to allow
        } else{
            callBack(new Error('Not allowed by CORS'));
        }
    }
}


