const searchBtn = document.getElementById("search-btn");
const productList = document.getElementById("product_list");





const loaderDiv = document.getElementById("loader")

searchBtn.addEventListener("click", getListing);


function showLoader(){
  loaderDiv.classList.add('show');
}

function hideLoader(){
  loaderDiv.classList.remove('show');
}

function getListing() {
  showLoader()
  let searchInputTxt = document.getElementById("search-input").value.trim();
  console.log(searchInputTxt);
  fetch(
    `https://api.gently.com/api/search/?query=${searchInputTxt}&page=1&price_min=&price_max=&size=&category=&gender=&brand=`,
    // `https://api.gently.com/api/search/?query=nike+shoes&page=1&price_min=&price_max=&size=&category=&gender=&brand=`,
    {
      headers: {
        authority: "api.gently.com",
        accept: "application/json",
        "accept-language": "en-US,en-IN;q=0.9,en;q=0.8",
        authorization:
          "Bearer WyIweDMzZDNhOGVjZWExOGUzM2U5NjgwODE1OTMyOTM4NGQ0Yzc0NDJkODg1MzQ5NDEyMDNlYzlhZWM1MjdkOTlhZmQ0MzQ0NTA3Njk3OTU4MWE5ZjZjYjQxZmRmY2UyNGFhNmVmYzFkZjc4NmFlYzM2NjYxYWZiMzA0MWE1MmUwNWM4MWMiLCJ7XCJpYXRcIjoxNjY5ODI2NTMxLFwiZXh0XCI6MTY3NzYwMjUzMSxcImlzc1wiOlwiZGlkOmV0aHI6MHhmMTA5YkYxOGI4OGRCNzI1ODRjMGJEMjMyQjIxMTgyNGY3YjlmYjE5XCIsXCJzdWJcIjpcIldGcTNQMFVTU1N1RWhpZTBYUW1LTEJzdzdyakZhSHp3RjhhUFZwRU9pZlE9XCIsXCJhdWRcIjpcIkh1LXc2R1VGc1gyc2JUdmZvWFZDWGQwSnROTWdGQm5ld0UtTTRqdEZfdDA9XCIsXCJuYmZcIjoxNjY5ODI2NTMxLFwidGlkXCI6XCIxMmNmZDE2Mi1hOGFiLTRkMWUtYmIwYi0xNTAzYzI0N2VhYzJcIixcImFkZFwiOlwiMHgyOTY4ZDJlNGExMDc2ZDJiMWQyYjQzYTM1OTFjZmYxNDkwZDUyOGJiMTZmODhlZDgwMjNiNWJhOWI1MmI4YjExNTc5NjllNjg4ZmQ3NDI0ZDhlMmQ1NzA3ODdjODdjNjc1NWMyZjZlMzdkYzM5MDA0MzNiZWJiNDM4NjBjZDYwNjFjXCJ9Il0=",
        "content-type": "application/json",
        origin: "https://gently.com",
        referer: "https://gently.com/",
        "sec-ch-ua":
          '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      },
    }
  )
    .then((response) => response.json()) // convert to json
    // .then((json) => console.log(json)) //print data to console
    
    .then((data) => {
      hideLoader()
      console.log(data);
        
      let html = "";
      if (data.listingInfos) {
        data.listingInfos.forEach((product_list) => {
          html += `
                    <div class="col-md-4 mt-2">                      
                    <div class="card">
                                        <div class="card-body">
                                            <div class="card-img-actions">
                                                
                                            <a href="${product_list.listingUrl}" target="_blank"><img src="${product_list.imageUrl}" class="card-img img-fluid" style="width: 300px; height: 300px;" alt=""></a>
                                                  
                                               
                                            </div>
                                        </div>
    
                                        <div class="card-body bg-light text-center">
                                            <div class="mb-2">
                                                <h6 class="font-weight-semibold mb-2">
                                                    <a href="${product_list.listingUrl}" target="_blank" class="text-default mb-2" data-abc="true" height="300" width="300">${product_list.name}</a>
                                                </h6>
    
                                                <a href="${product_list.listingUrl}" target="_blank" class="text-muted" data-abc="true">${product_list.company}</a>
                                            </div>
    
                                            <h3 class="mb-0 font-weight-semibold mb-3">$${product_list.price}</h3>
    
                                            <div>
                                               <i class="fa fa-star star"></i>
                                               <i class="fa fa-star star"></i>
                                               <i class="fa fa-star star"></i>
                                               <i class="fa fa-star star"></i>
                                            </div>
    
                                            <!-- <div class="text-muted mb-3">34 reviews</div> -->
    
                                            <a href="${product_list.listingUrl}" target="_blank"><button type="button" class="btn btn-primary"><i class="fa fa-cart-plus mr-2"></i> Buy Now</button></a>
    
                                            
                                        </div>
                    </div>         
               </div> 
                    `;
        });
        productList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        productList.classList.add("notFound");
      }

      productList.innerHTML = html;
    })
    .catch((err) => console.log("Request Failed", err)); // Catch errors
}


// fetch(
//     "https://api.gently.com/api/search/?query=Bicycle+deck&page=1&price_min=&price_max=&size=&category=&gender=&brand=",
//     {
//       headers: {
//         authority: "api.gently.com",
//         accept: "application/json",
//         "accept-language": "en-US,en-IN;q=0.9,en;q=0.8",
//         authorization:
//           "Bearer WyIweDMzZDNhOGVjZWExOGUzM2U5NjgwODE1OTMyOTM4NGQ0Yzc0NDJkODg1MzQ5NDEyMDNlYzlhZWM1MjdkOTlhZmQ0MzQ0NTA3Njk3OTU4MWE5ZjZjYjQxZmRmY2UyNGFhNmVmYzFkZjc4NmFlYzM2NjYxYWZiMzA0MWE1MmUwNWM4MWMiLCJ7XCJpYXRcIjoxNjY5ODI2NTMxLFwiZXh0XCI6MTY3NzYwMjUzMSxcImlzc1wiOlwiZGlkOmV0aHI6MHhmMTA5YkYxOGI4OGRCNzI1ODRjMGJEMjMyQjIxMTgyNGY3YjlmYjE5XCIsXCJzdWJcIjpcIldGcTNQMFVTU1N1RWhpZTBYUW1LTEJzdzdyakZhSHp3RjhhUFZwRU9pZlE9XCIsXCJhdWRcIjpcIkh1LXc2R1VGc1gyc2JUdmZvWFZDWGQwSnROTWdGQm5ld0UtTTRqdEZfdDA9XCIsXCJuYmZcIjoxNjY5ODI2NTMxLFwidGlkXCI6XCIxMmNmZDE2Mi1hOGFiLTRkMWUtYmIwYi0xNTAzYzI0N2VhYzJcIixcImFkZFwiOlwiMHgyOTY4ZDJlNGExMDc2ZDJiMWQyYjQzYTM1OTFjZmYxNDkwZDUyOGJiMTZmODhlZDgwMjNiNWJhOWI1MmI4YjExNTc5NjllNjg4ZmQ3NDI0ZDhlMmQ1NzA3ODdjODdjNjc1NWMyZjZlMzdkYzM5MDA0MzNiZWJiNDM4NjBjZDYwNjFjXCJ9Il0=",
//         "content-type": "application/json",
//         origin: "https://gently.com",
//         referer: "https://gently.com/",
//         "sec-ch-ua":
//           '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": '"Windows"',
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-site",
//         "user-agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
//       },
//     }
//   )
//     .then((response) => response.json()) // convert to json
//     .then((json) => console.log(json)) //print data to console
//     .catch((err) => console.log("Request Failed", err)); // Catch errors