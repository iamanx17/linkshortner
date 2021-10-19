import json
import requests

url = "http://localhost:3000/api/"

headers={  "Content-Type":"application/json"  }

data ={
   
        "urlid":{
            "gxdp8":"https://reddit.com"
    }   
}

json_data = json.dumps(data)

r= requests.post(url, headers=headers, data=json_data)


data = r.json()

print(data)
