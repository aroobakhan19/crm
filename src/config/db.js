import toast from "react-hot-toast";

const showToast = (message, type) => {
  toast.custom(
    (t) => (
      <div
        style={{
          padding: "10px 20px",
          color: "#fff",
          backgroundColor: type === "success" ? "#4CAF50" : "#F44336",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          fontWeight: "bold",
        }}
      >
        {message}
      </div>
    ),
    { duration: 3000, position: "top-right" }
  );
};


const token = localStorage.getItem('token');

export async function LoginUser(userLogin) {
    try {
      const response = await fetch('https://crm-backend-plum.vercel.app/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userLogin),
      });
  
      const data = await response.json();
        if (response.ok && data.token) {
            // Save token to localStorage
            localStorage.setItem('tokens', data.token);
            return data;
        } else {
         console.log('login failed')
        }

     

    } catch (e) {
      console.log(e.message);
      alert('Failed to log in user');
      return false;
    }
  }
  
  
  

export async function addUser(information) {
    try{
       const response = await fetch('https://crm-backend-plum.vercel.app/users/register',{
             method:"POST",
             headers:{
                 'Content-Type': 'application/json'
             },
             body:JSON.stringify({
                name: information.userName,
                id: information.userId,  
                password: information.userPassword,  
                email: information.userEmail, 
                role: information.employeeRole, 
                // AddUser: information.addUserPermission,
                // AddRequirment: information.addRequirmentPermission,  
                // addAvaibilityPermission: information.addAvaibilityPermission,  
                // AddProject: information.addProjectPermission,  
                // AddRental: information.addRentalPermission,  
                // AddExpense: information.addExpensePermission   
             })
           
         })
         const data = await response.json();
         if (response.ok) {
           console.log(data);
           showToast('user add successful!',"success");
          } else {
            showToast('Failed to add user', "error")
          }
     } catch (e){
         console.log(e.message)
         throw new Error('Failed to add user to the database')
     }
}

export async function Addproject(addproject){
  try{
    const response = await fetch('https://crm-backend-plum.vercel.app/project/register',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body:JSON.stringify({
            projectTitle: addproject.projectTitle,
            ProjectType: addproject.projectType,  
            BedRoom: addproject.bedroom,  
            bathRoom: addproject.bathroom, 
            squareFeet: addproject.sqft, 
            addPrice: addproject.price,
            Location: addproject.address,  
            state: addproject.state,  
            country: addproject.country,  
            zipCode: addproject.zipCode,  
          })
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showToast('project add successful!',"success");
      } else {
        showToast('Failed to add project', "error")
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}


export async function Addrequirments(addrequirment){
  try{
    const response = await fetch('https://crm-backend-plum.vercel.app/requirment/register',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body:JSON.stringify({
            clientName: addrequirment.clientName,
            clientPhoneNumber: addrequirment.clienPhoneNumber,  
            Location: addrequirment.adress,  
            ProjectType: addrequirment.projecttype, 
            requirmentType: addrequirment.requirmentType, 
            squareFeet: addrequirment.sqft,
            Room: addrequirment.room,  
            Message: addrequirment.message, 
            addPrice:  addrequirment.price,
            addInstallment :  addrequirment.installment,
            addMonthlyPayment : addrequirment.monthlyPayment,
            addAdvancedPayment : addrequirment.advancePayment
          })
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showToast('requirment add successful!',"success");
      } else {
        showToast('Failed to add requirment', "error")
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}



export async function AddDeveloperAvability(adddeveloperavability){
  try{
    const response = await fetch('https://crm-backend-plum.vercel.app/developerAvability/register',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body:JSON.stringify({
            clientName: adddeveloperavability.clientName,
            clientPhoneNumber: adddeveloperavability.clientPhoneNumber,  
            propertyDescription: adddeveloperavability.propertyDescription,  
            Location: adddeveloperavability.adress, 
            propertyName: adddeveloperavability.projectTitle, 
            ProjectType: adddeveloperavability.projectType,
            requirmentType: adddeveloperavability.requirmentType,  
            addPrice: adddeveloperavability.price, 
            addAdvancedPayment: adddeveloperavability.advancePayment,  
            projectMonthlyRent: adddeveloperavability.monthlyPayment, 
            rooms: adddeveloperavability.room,
            sqft: adddeveloperavability.sqft,
            Message: adddeveloperavability.message,
          })
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showToast('Avaibility add successful!',"success");
      } else {
        showToast('Failed to add avaibility', "error")
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}

export async function AddOfficeAvability(addofficeavability){
  try{
    const response = await fetch('https://crm-backend-plum.vercel.app/officeAvability/register',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body:JSON.stringify({
            clientName: addofficeavability.clientName,
            clientPhoneNumber: addofficeavability.clientPhoneNumber,  
            propertyDescription: addofficeavability.propertyDescription,  
            Location: addofficeavability.adress, 
            propertyName: addofficeavability.projectTitle, 
            ProjectType: addofficeavability.projectType,
            requirmentType: addofficeavability.requirmentType,  
            addPrice: addofficeavability.price, 
            addAdvancedPayment: addofficeavability.advancePayment,  
            projectMonthlyRent: addofficeavability.monthlyPayment, 
            rooms: addofficeavability.room,
            sqft: addofficeavability.sqft,
            Message: addofficeavability.message,
          })
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showToast('avaibility add successful!',"success");
      } else {
        showToast('Failed to add avaibility', "error")
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}

export async function Addtask(addtask){
  try{
    const response = await fetch('https://crm-backend-plum.vercel.app/task/register',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body:JSON.stringify({
            taskName: addtask.taskTitle,
            taskDescription: addtask.taskDescription,  
            taskPriority: addtask.taskPriority,  
            taskDeadLine: addtask.taskDueDate, 
            taskAssignedTo: addtask.taskPersonId,
            // taskId: addtask.taskPersonId,
          })
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showToast('task add successful!',"success");
      } else {
        showToast('Failed to add task', "error")
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}


export async function AddExpense(addexpense) {
  try {
    const response = await fetch('https://crm-backend-plum.vercel.app/submitVoucher/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addexpense),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      showToast('expense add successful!',"success");
    } else {
      showToast('Failed to add expense', "error")
    }
  } catch (e) {
    console.error("Error while adding expense:", e.message);
    throw new Error('Failed to add expense to the database');
  }
}

export async function AddSell(consolidatedData) {
  try {
      const response = await fetch('https://crm-backend-plum.vercel.app/addsSellPropert/addSellProject', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(consolidatedData),
      });

      const data = await response.json();
      if (response.ok) {
          console.log('Server Response:', data);
          showToast('data add successful!',"success");
        } else {
          showToast(data.message || 'Failed to add data', "error");
        }
  } catch (error) {
      console.error('Network Error:', error.message);
      alert(`Network error: ${error.message}`);
  }
}


export async function AddOwnrequirments(addrequirment){
  try{
    const response = await fetch('https://crm-backend-plum.vercel.app/ownRequirment/register',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body:JSON.stringify({
            clientName: addrequirment.clientName,
            clientPhoneNumber: addrequirment.clienPhoneNumber,  
            Location: addrequirment.adress,  
            ProjectType: addrequirment.projecttype, 
            requirmentType: addrequirment.requirmentType, 
            squareFeet: addrequirment.sqft,
            Room: addrequirment.room,  
            Message: addrequirment.message, 
            addPrice:  addrequirment.price,
            addInstallment :  addrequirment.installment,
            addMonthlyPayment : addrequirment.monthlyPayment,
            addAdvancedPayment : addrequirment.advancePayment
          })
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showToast('requirment add successful!', "success");
      } else {
        showToast('Failed to add requirment', "error")
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add requirment to the database')
  }
}


export async function AddownAvaibility(addavability){
  try{
    const response = await fetch('https://crm-backend-plum.vercel.app/ownAvaibility/register',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body:JSON.stringify({
            clientName: addavability.clientName,
            clientPhoneNumber: addavability.clientPhoneNumber,  
            propertyDescription: addavability.propertyDescription,  
            propertyLocation: addavability.adress, 
            propertyName: addavability.projectTitle, 
            ProjectType: addavability.projectType,
            projectRequirment: addavability.requirmentType,  
            projectPrice: addavability.price, 
            projectAdvanceRent: addavability.advancePayment,  
            projectMonthlyRent: addavability.monthlyPayment, 
            rooms: addavability.room,
            sqft: addavability.sqft,
            Message: addavability.message,
          })
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showToast('avaibility add successful!', "success");
      } else {
        showToast('Failed to add user', "error")
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}


export async function AddOwntask(addtask){
  try{
    const response = await fetch('https://crm-backend-plum.vercel.app/ownTask/register',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body:JSON.stringify(addtask)
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showToast('task add successful!', "success");
      } else {
        showToast('Failed to add task', "error")
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add task to the database')
  }
}

export async function Addbalance(addbalance){
  try{
    const response = await fetch('https://crm-backend-plum.vercel.app/balance/register',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(addbalance)
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showToast('balance add successful!',"success");
      } else {
        showToast('Failed to add balance', "error")
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add balance to the database')
  }
}


export async function payCommission(paycommission){
  try{
    const response = await fetch('https://crm-backend-plum.vercel.app/addsSellPropert/deductCommission',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(paycommission)
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        showToast('commission add successful!',"success");
      } else {
        showToast('Failed to add commission', "error")
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add balance to the database')
  }
}
