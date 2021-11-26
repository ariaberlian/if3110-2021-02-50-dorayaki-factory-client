import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import Resep from "../container/Resep";
import { useNavigate } from "react-router";


const RequestTokoList = () => {
    const [requestToko, setRequestToko] = useState([]);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        getRequestToko();
        refreshToken();
    }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp)
        }catch(error){
            if(error.response){
                navigate('/')
            }
        }
    }

    const axiosJWT = axios.create();
    
    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp)
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getRequestToko = async () => {
        const response = await axiosJWT.get('http://localhost:5000/request-toko?ip=::1');
        console.log(response.data)
        setRequestToko(response.data);
    }

    const sortDate = () => {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
          //start by saying: no switching is done:
          switching = false;
          rows = table.rows;
          /*Loop through all table rows (except the
          first, which contains table headers):*/
          for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("td")[4];
            y = rows[i + 1].getElementsByTagName("td")[4];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      }
      const sortStatus = () => {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
          //start by saying: no switching is done:
          switching = false;
          rows = table.rows;
          /*Loop through all table rows (except the
          first, which contains table headers):*/
          for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("td")[3];
            y = rows[i + 1].getElementsByTagName("td")[3];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      }
    
    const myFunction = () =>{
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }

    return (
        <div>
            <input type="text" id="myInput" onChange={myFunction} placeholder="Search for names.." title="Type in a name" />
            <table id="myTable" className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" >
                <thead>
                    <tr className="header">
                        <th>ID Request</th>
                        <th>Varian</th>
                        <th>Jumlah Penambahan</th>
                        <th>Status
                            <button className="button is-small is-info ml-5" onClick="sortStatus()">Sort</button>
                        </th>
                        <th>
                            Date
                            <button className="button is-small is-info ml-5" onClick="sortDate()">Sort</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { requestToko.map((requestToko, index) => (

                    <tr key={requestToko.id_request}>
                        <td>{requestToko.id_request}</td>
                        <td>{requestToko.varian}</td>
                        <td>{requestToko.jumlah_penambahan}</td>
                        <td>{requestToko.status}</td>
                        <td>{requestToko.updated_at}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RequestTokoList
