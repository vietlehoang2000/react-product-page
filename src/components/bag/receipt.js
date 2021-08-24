
export default function Receipt({localStorageData}){

    const subTotal= localStorageData.reduce(function(previousValue,currentValue){
        return previousValue + currentValue.quantity*currentValue.price;
    },0)

    let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
    

    console.log(localStorageData)
    return(<div className="bag-receipt d-flex flex-row-reverse">
        <div className="col-8">
            <div className="receipt--sub-total d-flex justify-content-between">
                <h5>Subtotal</h5>
                <h5 className="text-end">{formatter.format(subTotal)}</h5>
            </div>
            <div className="receipt--sub-shipping d-flex justify-content-between">
                <h5>Shipping</h5>
                <h5 className="text-end">{formatter.format(70)}</h5>
            </div>
            <hr></hr>
            <div className="receipt--total d-flex justify-content-between">
                <h3>Total</h3>
                <h3 className="text-end">{formatter.format(subTotal+70)}</h3>
            </div>
        </div>
    </div>)
}