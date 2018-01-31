const ListingOptions = {
  propertyTypes: [
    {value: "house", name: "House"},
    {value: "apartment", name: "Apartment"},
    {value: "condo", name: "Condo/Co-op"},
    {value: "townhome", name: "Townhomes"},
    {value: "manufacuted", name: "Manufactured"},
    {value: "lot", name: "Lot/Land"}
  ],
  mlsStatuses: [
    {
      value: "active",
      name: "Active",
      definition: `This status means that the listing is available and unencumbered
        by any contract. The days on market count continues during this period.`
    }, {
      value: "contingentWithKickout",
      name: "Contingent with kickout",
      definition: `This status means that the listing has an accepted contract but it
        is contingent upon the buyer getting a contract and closing on their current
        home. Additionally, with kickout means that a buyer who can purchase without
        selling a home could make an offer on the home as a backup offer.  If the
        seller likes the second offer better, he could give notice to his first
        buyer that the first buyer must firm up and waive the contingency or be
        kicked out of the contract so that the seller can move forward with
        contract number 2.  The days on market count continues during this period.`
    }, {
      value: "contingentNoKickout",
      name: "Contingent no Kickout",
      definition: `This means that the listing has an accepted contract but the seller
      did not require that there be a kickout period on the contract. A prospective
      buyer that might want to write a contract on this property in this status must
      understand that they can write an offer and if accepted by the seller, it will
      remain in backup status. The seller cannot kick his first buyer out. The only
      way contract number 2 can become a primary contract is if the first contract
      falls apart on it’s own accord (building inspection, financing, etc.) The days
      on market count continues during this period.`
    }, {
      value: "contingentShortSale",
      name: "Contingent short sale",
      definition: `This means that the listing has an accepted contract but the accepted
        contract must have lender approval. The home is being sold at a price that will
        require the lender(s) to accept less than what is owed on the home. A prospective
        buyer must understand that he may or may not have a chance to put in a second contract
        offer that may or may not be considered. This is a very tricky situation and
        requires a professional real estate agent with experience in short sales to help them
        navigate this type of transaction. The days on market count continues during this period.`
    }, {
      value: "option",
      name: "Option",
      definition: `This means that the listing has an accepted contract. The option period
        is the time period during which inspections are being performed and according to the
        St. Louis Association of Realtors board contract, it is the time period during which
        a buyer can terminate a contract after purchasing a building inspection. Once a building
        inspection notice (or request for repairs to be made) is submitted to the seller, the
        option period is terminated. The length of the option period is dictated in the contract.
        The default time period for option status is 10 days but can be changed to a different time
        period with agreement from both parties. The days on market count continues during this period.`
    }, {
      value: "temporarilyOffMarket",
      name: "Temporarily off market",
      definition: `This status is to be used on a short term basis for a home listing that needs to
        out of the MLS briefly. This could be due to a need for a repair or because the seller has
        some improvements that are needed based on feedback from showing agents. The home will not
        be shown during this period. Days on market count is suspended during this period. It resumes
        when the home listing is activated again.`
    }, {
      value: "pending",
      name: "Pending",
      definition: `This status means that the home is under contract and the buyer can no longer
        walk out of the contract on the building inspection results. While pending, a home will
        no longer be shown. Days on market count is suspended during this period.  If the listing
        is reactivated if the contract falls apart, all of the days on market to date are picked up
        and applied to the listing.`
    }, {
      value: "sold",
      name: "Sold",
      definition: `This status means that a closing has occurred and the property is no longer
        available for sale.  Days on market count is terminated.`
    }, {
      value: "withdrawn",
      name: "Withdrawn",
      definition: `This status means that the listing agent has removed the listing from the
        MLS but still has a valid listing agreement with the seller. The house may or may not
        be able to be shown. The listing agent would need to be consulted on a case by case
        basis under this status. Days on market count is suspended during this period.`
    }, {
      value: "cancelled",
      name: "Cancelled",
      definition: `This status means that the listing agreement between listing broker and seller
        has been terminated. The home is no longer for sale. The days on market count is terminated
        with this status.`
    }
  ]
}

export default ListingOptions
