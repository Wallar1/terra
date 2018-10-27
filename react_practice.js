// gparent
//.   parent
//        child
//rendering it 

// this.props.render(this.state)
//aka this.props.func(this.state_data)
//<Mouse func={(state_data)=>(<Cat mouse={state_data} />)}/>

// class Cat extends React.Component {
//   render() {
//     const data = this.props.data;
//     return (
//       <img src="/cat.jpg" style={{ position: 'absolute', left: data.x, top: data.y }} />
//     );
//   }
// }

// export class Gparent extends React.Component{
//   render(){
//     <Parent children={data => (<Child data={this.state.data} />)} />
//   }
// }

// export class Parent extends React.Component{
//   render(){
//     {this.props.children}
//   }
// }

// export class Child extends React.Component{
//   render(){
//     <h1> Hey </h1>
//   }
// }




//purpose: will go to your resume site, and will send you an email
// const puppeteer = require('puppeteer')

// const log = async (message) => {
//   console.log(message)
// }

// const click = async (elem) => {
//   elem.click()
//   return true
// }

// let scrape = async () => {
//   const browser = await puppeteer.launch({headless: false, devtools: true});
//   const page = await browser.newPage();
//   await page.goto('https://craig-wallace-resume.herokuapp.com');
//   await page.$eval('body', body => {
//     let height = 0
//     while(height !== body.scrollHeight){
//       height = body.scrollHeight
//       window.scrollBy(0, body.scrollHeight + 100);
//     }
//     console.log(height)
//     return true
//   });

//   async function close_browser(){
//     await browser.close();
//   }

//   async function type(elem,text){
//     elem.type(text)
//     console.log('typed: '+ text)
//   }
//   page.on('dialog', async dialog => {
//     await dialog.accept();
//     console.log('dialog')
//     await page.waitFor(5000)
//     await close_browser()
//     return true
//   });

//   async function get_elem(id){
//     await page.$('#'+ id)
//   }

//   function async_wrapper(id, text){
//     await get_elem(id).then(result=>{await type(result, text)}
//   }

//   async function type_then_click(){
//     const emailname = page.$('#email_name')
//     const emailsubject = page.$('#email_subject')
//     const emailfrom = page.$('#email_from')
//     const emailmessage = page.$('#email_message')
//     const submit = page.$('#submit_email')
//     //await emailname.type('Craig Wallace Jr.')
//     await type(emailsubject,'Test Message')
//     await type(emailfrom,'robertwallace.naples@gmail.com')
//     await type(emailmessage,'Hey there :)')
//     await type(emailname,'Craig Wallace Jr.')
//     await page.waitFor(4000)
//     await click(submit)
//   }

//   type_then_click()

//   //page.waitFor(1000)
  
//   return null
// }

// scrape()
//.then((value)=>{
//   console.log(value)
// })





//purpose: will go to asana and get the addresses for all of scott's customers