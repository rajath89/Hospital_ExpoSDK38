

  const rand=(maxLimit = 1000)=> {
    let rand = Math.random() * maxLimit;
    return Math.floor(rand);
   }



export default function RAN() {
    var rn=rand();
    return {
        type : 'RAN_NUM',
        payload:rn
    };
}