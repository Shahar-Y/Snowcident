1. http://<IP>:<PORT>/api/now/table/sys_user?sysparm_query=u_uuid%3D123x3456vv543 ==> sys_id
   1.GET http://<IP>:<PORT>/api/now/table/sys_user?sysparm_query=u_uuid%3D<KartoffelID>

2. http://<IP>:<PORT>/api/now/table/incident ==> caller_id == sys_id

3. GET choices: http://68.219.116.115:16000/api/now/table/sys_choice?element=category&language=he&name=incident ==> label

4. GET choices: http://68.219.116.115:16000/api/now/table/sys_choice?element=u_network&language=he&name=incident ==> label
