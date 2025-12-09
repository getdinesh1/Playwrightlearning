class ApiUtils{


    constructor(ApiContext,payload)
    {
        this.ApiContext=ApiContext;
        this.payload =payload;
    }

  async getToken()
    {
            // Step 1: Login and get token
            const response=await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                {
                    data: this.payload
                });
        
        
            const json= await response.json();
           const token=json.token;
            return token;
    }


    async getOrderId(orderPayload)
    {
       const token =await this.getToken()
         const orderResponse = await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data: orderPayload,
                    headers: {
                        "content-type": "application/json",
                        "authorization": token
                    }
                }
            )
                
            const orderJson = await orderResponse.json();
            
            // Validate response structure and extract order ID
            if (!orderJson.orders || !Array.isArray(orderJson.orders) || orderJson.orders.length === 0) {
                throw new Error(`Order creation failed. Response: ${JSON.stringify(orderJson)}`);
            }
        
          const  orderId = orderJson.orders[0];
            console.log("Order ID extracted:", orderId);
            return orderId;
    }





}

module.exports={ApiUtils};