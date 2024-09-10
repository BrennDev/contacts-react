
import ContactList from './components/ContactList'; 

function App() {
  const apiUrl = 'https://reqres.in/api/users?delay=4'; 

  return (
    <div className="App">
      <ContactList apiUrl={apiUrl} />
    </div>
  );
}

export default App;
