const token = localStorage.getItem('token');

export async function LoginUser(userLogin) {
    try {
      const response = await fetch('http://localhost:3001/users/login', {
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
       const response = await fetch('http://localhost:3001/users/register',{
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
           alert('User add successful!');
         } else {
           alert('Failed to add user')
         }
     } catch (e){
         console.log(e.message)
         throw new Error('Failed to add user to the database')
     }
}

export async function Addproject(addproject){
  try{
    const response = await fetch('http://localhost:3001/project/register',{
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
            price: addproject.price,
            Location: addproject.address,  
            state: addproject.state,  
            country: addproject.country,  
            zipCode: addproject.zipCode,  
          })
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert('project add successful!');
      } else {
        alert('Failed to add user')
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}


export async function Addrequirments(addrequirment){
  try{
    const response = await fetch('http://localhost:3001/requirment/register',{
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
        alert('requirment add successful!');
      } else {
        alert('Failed to add user')
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}



export async function AddDeveloperAvability(adddeveloperavability){
  try{
    const response = await fetch('http://localhost:3001/developerAvability/register',{
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
        alert('avability add successful!');
      } else {
        alert('Failed to add user')
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}

export async function AddOfficeAvability(addofficeavability){
  try{
    const response = await fetch('http://localhost:3001/officeAvability/register',{
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
            projectPrice: addofficeavability.price, 
            projectAdvanceRent: addofficeavability.advancePayment,  
            projectMonthlyRent: addofficeavability.monthlyPayment, 
            rooms: addofficeavability.room,
            sqft: addofficeavability.sqft,
            Message: addofficeavability.message,
          })
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert('avability add successful!');
      } else {
        alert('Failed to add user')
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}

export async function Addtask(addtask){
  try{
    const response = await fetch('http://localhost:3001/task/register',{
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
            taskAssignedTo: addtask.taskAssignedTo, 
            taskId: addtask.taskPersonId,
          })
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert('requirment add successful!');
      } else {
        alert('Failed to add user')
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}


export async function AddExpense(addexpense) {
  try {
    const response = await fetch('http://localhost:3001/submitVoucher/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addexpense),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      alert('Expense added successfully!');
    } else {
      console.error("Error response from server:", data);
      alert('Failed to add expense.');
    }
  } catch (e) {
    console.error("Error while adding expense:", e.message);
    throw new Error('Failed to add expense to the database');
  }
}

export async function AddSell(consolidatedData) {
  try {
      const response = await fetch('http://localhost:3001/addsSellPropert/addSellProject', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(consolidatedData),
      });

      const data = await response.json();
      if (response.ok) {
          console.log('Server Response:', data);
          alert('Expense added successfully!');
      } else {
          console.error('Error Response:', data);
          alert(`Failed to add expense: ${data.message || 'Unknown error'}`);
      }
  } catch (error) {
      console.error('Network Error:', error.message);
      alert(`Network error: ${error.message}`);
  }
}


export async function AddOwnrequirments(addrequirment){
  try{
    const response = await fetch('http://localhost:3001/ownRequirment/register',{
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
        alert('requirment add successful!');
      } else {
        alert('Failed to add user')
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}


export async function AddownAvaibility(addavability){
  try{
    const response = await fetch('http://localhost:3001/ownAvaibility/register',{
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
        alert('avaibility add successful!');
      } else {
        alert('Failed to add user')
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add user to the database')
  }
}


export async function AddOwntask(addtask){
  try{
    const response = await fetch('http://localhost:3001/ownTask/register',{
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
        alert('task add successful!');
      } else {
        alert('Failed to add task')
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add task to the database')
  }
}

export async function Addbalance(addbalance){
  try{
    const response = await fetch('http://localhost:3001/balance/register',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(addbalance)
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert('balance add successful!');
      } else {
        alert('Failed to add balance')
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add balance to the database')
  }
}


export async function payCommission(paycommission){
  try{
    const response = await fetch('http://localhost:3001/addsSellPropert/deductCommission',{
          method:"POST",
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(paycommission)
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert('balance add successful!');
      } else {
        alert('Failed to add balance')
      }
  } catch (e){
      console.log(e.message)
      throw new Error('Failed to add balance to the database')
  }
}
