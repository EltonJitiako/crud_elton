import './App.css';
import Parse from 'parse/dist/parse.min.js';

Parse.initialize(process.env['REACT_APP_APP_ID'], process.env['REACT_APP_JS_KEY']); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/'  

async function saveNewPerson() {

  const person = new Parse.Object("Person");
  const name = document.getElementById("username").value;
  const age = parseInt(document.getElementById("age").value);
  
  person.set("name", name);
  person.set("age", age);
  try {
        await person.save()
        alert("Created successfully");

  } catch(error) {
          alert("Something wrong....");

  } 


}
async function retrievePerson() {
  const query = new Parse.Query("Person");
  
  try {
    let text = "";
    query.notEqualTo("objectId", null);
    query.find().then(function(subItems){

      for (let i=0; i<subItems.length; i++){
        text += "Userame: " + subItems[i].get("name") + ", Age: " + subItems[i].get("age") + "; \n";

      }

      document.getElementById('displayDB').innerText=text;

    });

  } catch (error) {
    alert("Something wrong....");

  }
}  

async function updatePerson() {
        const query = new Parse.Query("Person");

        const name1 = document.getElementById("username3").value;
        const name2 = document.getElementById("username4").value;
        const age = parseInt(document.getElementById("age2").value);

        query.equalTo("name", name1);
        const result = await query.find()
        result[0].set("name", name2);
        result[0].set("age", age);
        try{
            result[0].save();
            alert("Updated successfully");

        }catch(error){
            alert("Something wrong....");

        }
    } 

async function deletePerson() {
        const query = new Parse.Query("Person");
        
        try{
            const name = document.getElementById("username2").value;
            query.equalTo("name", name);
            const result = await query.find()
            result[0].destroy();
            alert("Deleted successfully");
            
        }catch(error){
            alert("Something wrong....");
            
        }
  } 


function App() {
  
  return (
    <div className="App">
      <div className='background'>     
        <div className="App-header">
          <h1 className='head' id="head1">
            <div style={{color: "green"}}>C</div>
            <div style={{color: "yellow"}}>R</div>
            <div style={{color: "blue"}}>U</div>
            <div style={{color: "red"}}>D</div>
            _
          </h1>
          <h2 className='head' id="head2">
            <div style={{color: "green"}}>Create</div>, 
            <div style={{color: "yellow"}}>Read</div>,
            <div style={{color: "blue"}}>Update</div>and
            <div style={{color: "red"}}>Delete</div>
          </h2>
          <br />
          <div id='create'>
            <input id="username" type="text" placeholder="Username" />
            <input id="age" type="integer" placeholder="Age" />
            <button onClick={saveNewPerson}>CreateNew</button>
          </div>
          <br />
          <br />
          <div id='read'>
            <button onClick={retrievePerson}>ShowDB</button>
            <h1 id='displayDB'>Show DB here!!!!</h1>
          </div>
          <br />
          <br />
          <div id='update'>
            <input id="username3" type="text" placeholder="Old Username" />
            <input id="username4" type="text" placeholder="New Username" />
            <input id="age2" type="integer" placeholder="New Age" />
            <button onClick={updatePerson}>Update</button>
          </div>
          <br />
          <br />
          <div id='delete'>
            <input id="username2" type="text" placeholder="Username" />
            <button onClick={deletePerson}>Delete!</button>
          </div>
          <br />
          <br />
          <p>By Elton Luiz Jitiako</p>
          <p>Made with:</p>
          <p>Frontend: HTML5, CSS3, JavaScript, REACT. Hosted: Vercel</p>
          <p>Backend: DB PostgreeSQL. Hosted: Back4App</p>
        </div>
      </div>
    </div>
  );
}

export default App;
