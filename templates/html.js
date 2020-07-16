      

        function returnHtml(typeOfmember, name, role, id, email, github) {
        let returnThis;

   
         if (typeOfmember == "Engineer") {
             returnThis = `<div class="col-6"><div class="card mx-auto mb-3" style="width: 18rem"><h5 class="card-header"> ${name} <br /><br />Engineer</h5>
             <ul class="list-group list-group-flush"><li class="list-group-item">ID: ${id}</li><li class="list-group-item">Email Address: ${email}</li>
             <li class="list-group-item">GitHub: ${github}</li></ul></div></div>`;}
         
         if (typeOfmember == "Intern") {
            returnThis = `<div class="col-6"><div class="card mx-auto mb-3" style="width: 18rem"><h5 class="card-header">${name}<br /><br />Intern</h5><
            ul class="list-group list-group-flush"><li class="list-group-item">ID: ${id}</li><li class="list-group-item">Email Address: ${email}</li>
            <li class="list-group-item">School: ${school}</li></ul></div></div>`; }


        if (typeOfmember == "Manager") {

            returnThis = `<div class="col-6"><div class="card mx-auto mb-3" style="width: 18rem"><h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${id}</li><li class="list-group-item">Email Address: ${email}</li><li class="list-group-item">Contact Number: ${number}</li></ul>
            </div></div>`;  }

            if (typeOfmember == "footer") {
                returnThis = ` </div></div></body></html>`;
            }

            console.log(returnThis);

        
        


         return(returnThis);

        }

module.exports = returnHtml;

