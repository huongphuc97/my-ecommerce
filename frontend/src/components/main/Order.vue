<template>
  <div class="item">
    <div class="card">
      <div class="text-center title">Order details</div>
      <div class="info">
        <div class="row">
          <div class="col-7">
            <span id="heading">Created at</span><br />
            <span id="details">{{ this.orderDetails.created }}</span>
          </div>
          <div class="col-5 pull-right">
            <span id="heading">Order No.</span><br />
            <span id="details">{{ code }}</span>
          </div>
        </div>
      </div>
      <div class="pricing">
        <div class="row">
          <div class="col-9">
            <span id="name">{{ this.orderDetails.order_details_name }}</span>
          </div>
          <div class="col-3">
            <span id="price"
              >$ {{ this.orderDetails.order_details_price }} x
              {{ this.orderDetails.order_details_quantity }}</span
            >
          </div>
        </div>
      </div>
      <div class="total">
        <div class="row">
          <div class="col-9">Total</div>
          <div class="col-3">
            <p>
              $
              {{
                this.orderDetails.order_details_price *
                this.orderDetails.order_details_quantity
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="row">
          <div class="col-2">
            <img class="img-fluid" src="https://i.imgur.com/YBWc55P.png" />
          </div>
          <div class="col-10">
            Want any help? Please &nbsp;<a> contact us</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Order",
  data() {
    return {
      orderDetails: [],
    };
  },
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  mounted() {
    axios
      .get(`https://get-api-ecommerce-pj.herokuapp.com/orders/get/${this.code}`)
      .then((response) => {
        this.orderDetails = response.data.myData[0];
      });
  },
};
</script>
<style scoped>
.item {
  margin-top: 130px;
  margin-bottom: 100px;
}
.card {
  margin: auto;
  width: 38%;
  max-width: 600px;
  padding: 4vh 0;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-top: 3px solid rgb(252, 103, 49);
  border-bottom: 3px solid rgb(252, 103, 49);
  border-left: none;
  border-right: none;
}
.title {
  color: rgb(252, 103, 49);
  font-weight: 600;
  margin-bottom: 2vh;
  padding: 0 10%;
  font-size: initial;
}

#details {
  font-weight: 400;
}

.info {
  padding: 5% 8%;
}
#heading {
  color: grey;
  line-height: 6vh;
}

.pricing {
  background-color: #ddd3;
  padding: 2vh 8%;
  font-weight: 400;
  line-height: 2.5;
}

.pricing .col-3 {
  padding: 0;
}
.total {
  padding: 2vh 8%;
  color: rgb(252, 103, 49);
  font-weight: bold;
}

.total .col-3 {
  padding: 0;
}

.footer {
  padding: 0 8%;
  font-size: x-small;
  color: black;
}
.footer img {
  height: 5vh;
  opacity: 0.2;
}

.footer .col-10,
.col-2 {
  display: flex;
  padding: 3vh 0 0;
  align-items: center;
}
</style>
