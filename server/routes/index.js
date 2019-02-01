var express = require('express');
var router = express.Router();
var axios = require('axios');

// search by word
  //list of all of the products, limited to a max=4 matches

router.get('/api/items', function (req, res) {
  const product = req.query.q

  axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + product + '&limit=4')
    .then(fullList => {
      console.log(fullList)
      const list = fullList.data.results.map(function (data) {
        console.log(data)
        return {

          id: data.id,
          title: data.title,
          // price: data.price,
          price: {
            currency: data.currency_id,
            amount: String(data.price).split('.')[0],
            decimals: String(data.price).split('.')[1]|| ''
          },
          picture: data.thumbnail,
          address: data.address.state_name,
          shipping: data.shipping.free_shipping
          }
      })
      res.json({items:list,categories:fullList.data.filters[0].values[0].path_from_root })
    })
})

//details of the product. Description is from another api, so there are two calls

router.get('/api/items/:id', function (req, res) {
  const id = req.params.id

  axios.get('https://api.mercadolibre.com/items/' + id)
    .then(prodDetail => {
   
      axios.get('https://api.mercadolibre.com/items/' + id + '/description')
        .then(dataDetail => {
          const category = prodDetail.data.category_id
          axios.get('https://api.mercadolibre.com/categories/' + category)
          .then(dataCat => {
            
            const productData = prodDetail.data
            const descriptionProd = dataDetail.data
            
            const productDetails = {
              category: productData.category_id || '',
              condition: productData.condition || '',
              sold: productData.sold_quantity || '',
              title: productData.title || '',
              price: {
                currency: productData.currency_id,
                amount: String(productData.price).split('.')[0],
                decimals: String(productData.price).split('.')[1]|| '00'
              },
              picture: productData.pictures[0].url || '',
              description: descriptionProd.plain_text ||'',
              address: productData.seller_address.state.name,
              categories: dataCat.data.path_from_root
             }
            res.json(productDetails)
          
          })
        })
    }
    )
})


module.exports = router;
