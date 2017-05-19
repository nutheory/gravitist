// import React, { Component } from 'react'
// import { StyleSheet, css } from 'aphrodite'
// import { Step, Stepper, StepButton } from 'material-ui/Stepper'
// import ExpandTransition from 'material-ui/internal/ExpandTransition'
// import RaisedButton from 'material-ui/RaisedButton'
// import FlatButton from 'material-ui/FlatButton'
// import layout from './styles/layout'
// import PricingList from './pricingList'
// import AuthOptions from './authOptions'
// import AddressToFilm from './addressToFilm'
// import OrderPayment from './orderPayment'
//
// class OrderWalkthrough extends Component {
//   constructor(){
//     super()
//     this.state = {
//       loading: false,
//       finished: false,
//       stepIndex: 0,
//       selectedPlan: ""
//     }
//
//     this.handleNext = this.handleNext.bind(this)
//     this.handlePrev = this.handlePrev.bind(this)
//   }
//
//   componentDidMount(){
//     // if(this.props.match.params.idx){
//     //   this.setState({ stepIndex: this.props.match.params.idx })
//     // }
//   }
//
//   handleNext(plan) {
//     const {stepIndex} = this.state
//     this.setState({
//       stepIndex: stepIndex + 1,
//       finished: stepIndex >= 2,
//       selectedPlan: plan
//     })
//   }
//
//   handlePrev() {
//     const {stepIndex} = this.state
//     if (stepIndex > 0) {
//       this.setState({stepIndex: stepIndex - 1})
//     }
//   }
//
//   getStepContent(stepIndex) {
//     switch (stepIndex) {
//       case 0:
//         return <PricingList handleNext={this.handleNext} handlePrev={this.handlePrev} />
//       case 1:
//         return <AuthOptions plan={this.state.selectedPlan} type="user" key={this.state.selectedPlan} />
//       case 2:
//         return <AddressToFilm />
//       default:
//         return <OrderPayment />
//     }
//   }
//
//   render(){
//     const {loading, stepIndex} = this.state
//     return(
//       <div>
//         <div className={css(layout.stepper)}>
//           <Stepper linear={false} activeStep={this.state.stepIndex}>
//             <Step>
//               <StepButton onClick={() => this.setState({stepIndex: 0})}>Choose a Plan</StepButton>
//             </Step>
//             <Step>
//               <StepButton onClick={() => this.setState({stepIndex: 1})}>Signup/Login</StepButton>
//             </Step>
//             <Step>
//               <StepButton onClick={() => this.setState({stepIndex: 2})}>Home to Film</StepButton>
//             </Step>
//             <Step>
//               <StepButton onClick={() => this.setState({stepIndex: 3})}>Payment</StepButton>
//             </Step>
//           </Stepper>
//         </div>
//         <div>
//           {this.getStepContent(this.state.stepIndex)}
//         </div>
//       </div>
//     )
//   }
// }
//
// export default OrderWalkthrough
