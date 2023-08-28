<template>
  <n-modal v-model:show="showModal">
    <ErrorModal title="Server Error" :message="expectionObject.message" :stackTrace="expectionObject.stack" />
  </n-modal>
  <div class="landing_header w-full">
    <h1 class="header2_h1">District Matching Project Form</h1>
  </div>
  <div class="formtabs_container p-4 md:p-24 lg:p-40">
    <!-- Tab Controls Flowbite -->
    <ul
      class="flex flex-wrap justify-center border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <li class="mr-2" v-for="tab in tabs" :key="tab.name">
        <a @click="activeTab = tab.name"
          class="inline-block cursor-pointer rounded-t-lg p-4 text-2xl hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          :class="{
            ' active  bg-gray-100 text-primary-dark-color dark:bg-gray-800 dark:text-blue-500':
              tab.name === activeTab,
          }">
          {{ tab.label }}
        </a>
      </li>
    </ul>
    <!-- Form Tab -->
    <div class="form_wrapper" v-if="activeTab === 'Form'">
      <h1 class="my-4 text-center underline underline-offset-8" :class="tailwind.H1">
        District Mathing Grants Club Application Form Criteria
      </h1>
      <ul class="my-8 px-4">
        <li class="list-disc" v-for="listItem in criteriaList" :key="listItem">
          {{ listItem }}
        </li>
      </ul>
      <hr :class="tailwind.FORMHR" />
      <div class="form_container">
        <!-- Section A -->
        <h1 class="form_item full_width my-4 text-center underline underline-offset-8" :class="tailwind.H1">
          Section A – Project Summary
        </h1>
        <!-- Basic Sponser club info-->
        <div class="form_item half_width">
          <BaseInputsText label="Project Name*" v-model="projectToUpdateOrCreate.project_name" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.project_name.$error" :errorMsg="v$.projectToUpdateOrCreate.project_name.$errors[0].$message
            " />
        </div>
        <div class="form_item">
          <BaseSelect v-model="projectToUpdateOrCreate.country" :options="countryList" label="Country*" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.country.$error"
            :errorMsg="v$.projectToUpdateOrCreate.country.$errors[0].$message" />
        </div>
        <div class="form_item">
          <BaseSelect v-model="projectToUpdateOrCreate.region" :options="regionList" label="Region*" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.region.$error"
            :errorMsg="v$.projectToUpdateOrCreate.region.$errors[0].$message" />
        </div>
        <div class="form_item">
          <BaseDatePicker v-model="projectToUpdateOrCreate.start_date" label="Project Start Date*" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.start_date.$error" :errorMsg="v$.projectToUpdateOrCreate.start_date.$errors[0].$message
            " />
        </div>
        <div class="form_item">
          <BaseDatePicker v-model="projectToUpdateOrCreate.completion_date" label="Project Completion Date*" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.completion_date.$error" :errorMsg="v$.projectToUpdateOrCreate.completion_date.$errors[0].$message
            " />
        </div>
        <div class="form_item full_width">
          <h3 class="form_item full_width text-center" :class="tailwind.H3">
            Areas of Focus
          </h3>
          <div class="areaoffocus_container">
            <div class="item">
              <img :src="areaFocusImages[0]" alt="" />
              <BaseCheckBox v-model="projectToUpdateOrCreate.area_focus.Peace_Conflict_Prevention
                " :label="areaFocusList.find(
    (area) => area.key === 'Peace_Conflict_Prevention'
  )?.label
    " />
            </div>
            <div class="item">
              <img :src="areaFocusImages[1]" alt="" />
              <BaseCheckBox v-model="projectToUpdateOrCreate.area_focus
                .Disease_Prevention_And_Treatment
                " :label="areaFocusList.find(
    (area) => area.key === 'Disease_Prevention_And_Treatment'
  )?.label
    " />
            </div>
            <div class="item">
              <img :src="areaFocusImages[2]" alt="" />
              <BaseCheckBox v-model="projectToUpdateOrCreate.area_focus.Water_And_Sanitation
                " :label="areaFocusList.find(
    (area) => area.key === 'Water_And_Sanitation'
  )?.label
    " />
            </div>
            <div class="item">
              <img :src="areaFocusImages[3]" alt="" />
              <BaseCheckBox v-model="projectToUpdateOrCreate.area_focus.Maternal_And_Child_Health
                " :label="areaFocusList.find(
    (area) => area.key === 'Maternal_And_Child_Health'
  )?.label
    " />
            </div>
            <div class="item">
              <img :src="areaFocusImages[4]" alt="" />
              <BaseCheckBox v-model="projectToUpdateOrCreate.area_focus
                .Basic_Education_And_Literacy
                " :label="areaFocusList.find(
    (area) => area.key === 'Basic_Education_And_Literacy'
  )?.label
    " />
            </div>
            <div class="item">
              <img :src="areaFocusImages[5]" alt="" />
              <BaseCheckBox v-model="projectToUpdateOrCreate.area_focus
                .Economic_And_Community_Development
                " :label="areaFocusList.find(
    (area) => area.key === 'Economic_And_Community_Development'
  )?.label
    " />
            </div>
            <div class="item">
              <img :src="areaFocusImages[6]" alt="" />
              <BaseCheckBox v-model="projectToUpdateOrCreate.area_focus.Environment" :label="areaFocusList.find((area) => area.key === 'Environment')
                ?.label
                " />
            </div>
          </div>
          <ErrorValidation class="text-center" v-if="v$.projectToUpdateOrCreate.area_focus.$error" :errorMsg="v$.projectToUpdateOrCreate.area_focus.$errors[0].$message
            " />
        </div>
        <div class="form_item full_width">
          <h3 class="text-center" :class="tailwind.H3">
            {{ headerFormatter("Primary and Optional Seconday contacts") }}
          </h3>
        </div>
        <div class="form_item">
          <BaseInputsText label="Primary Contact Name*" v-model="projectToUpdateOrCreate.extra_descriptions.primary_contact.name
            " />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.extra_descriptions.primary_contact.name
            .$error
            " :errorMsg="v$.projectToUpdateOrCreate.extra_descriptions.primary_contact.name
    .$errors[0].$message
    " />
        </div>
        <div class="form_item">
          <BaseInputsText label="Primary Contact Address*" v-model="projectToUpdateOrCreate.extra_descriptions.primary_contact.address
            " />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
            .address.$error
            " :errorMsg="v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
    .address.$errors[0].$message
    " />
        </div>
        <div class="form_item">
          <BaseInputsText label="Primary Contact Email*" v-model="projectToUpdateOrCreate.extra_descriptions.primary_contact.email
            " />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
            .email.$error
            " :errorMsg="v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
    .email.$errors[0].$message
    " />
        </div>
        <div class="form_item">
          <BaseInputsText label="Primary Contact Phone*" v-model="projectToUpdateOrCreate.extra_descriptions.primary_contact.phone
            " />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
            .phone.$error
            " :errorMsg="v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
    .phone.$errors[0].$message
    " />
        </div>
        <hr :class="tailwind.FORMHR" />
        <div class="form_item">
          <BaseInputsText label="Secondary Contact Name" v-model="projectToUpdateOrCreate.extra_descriptions.secondary_contact.name
            " />
        </div>
        <div class="form_item">
          <BaseInputsText label="Secondary Contact Address" v-model="projectToUpdateOrCreate.extra_descriptions.secondary_contact
            .address
            " />
        </div>
        <div class="form_item">
          <BaseInputsText label="Secondary Contact Email" v-model="projectToUpdateOrCreate.extra_descriptions.secondary_contact.email
            " />
        </div>
        <div class="form_item">
          <BaseInputsText label="Secondary Contact Phone" v-model="projectToUpdateOrCreate.extra_descriptions.secondary_contact.phone
            " />
        </div>
        <!-- Hostclub info -->
        <div class="form_item full_width">
          <h3 class="form_item full_width text-center" :class="tailwind.H3">
            Host Club Information (this is the partner outside of your district)
          </h3>
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.host_club_name
            " label="Enter Your Host Clubs' District Number" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information.host_club_name
            .$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information.host_club_name
    .$errors[0].$message
    " />
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.district_number
            " label="Host Club ID" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information.district_number
            .$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information.district_number
    .$errors[0].$message
    " />
        </div>
        <div class="form_item">
          <BaseSelect v-model="projectToUpdateOrCreate.hostclub_information.district_country
            " :options="countryList" label="Host Club Country" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information.district_country
            .$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information.district_country
    .$errors[0].$message
    " />
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.location_city"
            label="Host Club City / Community / Village" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information.location_city
            .$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information.location_city
    .$errors[0].$message
    " />
        </div>
        <div class="form_item full_width">
          <h3 class="form_item full_width text-center" :class="tailwind.H3">
            Host Club Primary Contact
          </h3>
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.host_primary_contact
            .name
            " label="Name" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information
            .host_primary_contact.name.$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information
    .host_primary_contact.name.$errors[0].$message
    " />
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.host_primary_contact
            .address
            " label="Address" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information
            .host_primary_contact.address.$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information
    .host_primary_contact.address.$errors[0].$message
    " />
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.host_primary_contact
            .email
            " label="Email" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information
            .host_primary_contact.email.$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information
    .host_primary_contact.email.$errors[0].$message
    " />
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.host_primary_contact
            .phone
            " label="Phone" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information
            .host_primary_contact.phone.$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information
    .host_primary_contact.phone.$errors[0].$message
    " />
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.host_primary_contact
            .cell
            " label="Cell / WhatsApp" />
        </div>
        <!-- objective table -->
        <div class="form_item full_width">
          <h3 class="form_item full_width text-center" :class="tailwind.H3">
            Create an itemized list of the specific objectives of the project
          </h3>
        </div>
        <div class="form_item full_width table">
          <div class="relative overflow-x-auto" id="item_table">
            <table class="w-full text-left text-sm text-gray-500">
              <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                <th scope="col" :class="tailwind.TABLEHEADER">No.</th>
                <th scope="col" :class="tailwind.TABLEHEADER">Objective</th>
                <th scope="col" :class="tailwind.TABLEHEADER">Actions</th>
              </thead>
              <tbody>
                <tr class="border bg-white">
                  <td class="px-6 py-4 text-primary-black">#</td>
                  <td class="px-6 py-4 text-primary-black">
                    <BaseInputsText v-model="objectiveItem" />
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-center font-medium">
                    <button class="crud-buttons plus_icon hover:text-primary-color" title="Add"
                      @click="addToObjectives(objectiveItem)">
                      <font-awesome-icon icon="fa-solid fa-circle-plus" />
                    </button>
                  </td>
                </tr>
                <tr id="objective_list" v-for="(item, index) in projectToUpdateOrCreate
                  .hostclub_information.listOfObjectives" :key="index">
                  <td class="px-6 py-4 text-primary-black">{{ index + 1 }}</td>
                  <td class="px-6 py-4 text-primary-black">{{ item }}</td>
                  <td class="text-center">
                    <button title="Delete" @click="deleteObjectiveByIndex(index)"
                      class="crud-buttons plus_icon hover:text-primary-color">
                      <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.project_description"
            label="Describe in detail the project and implementation plan." />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.project_description.$error" :errorMsg="v$.projectToUpdateOrCreate.project_description.$errors[0].$message
            " />
        </div>

        <!-- Section B -->
        <h1 class="form_item full_width my-4 text-center underline underline-offset-8" :class="tailwind.H1">
          Section B – Rotarian Participation
        </h1>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.hostclub_information
            .host_sponsor_planned_project_description
            " label="1. Describe how the Host sponsor (in other country) planned this project.*" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information
            .host_sponsor_planned_project_description.$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information
    .host_sponsor_planned_project_description.$errors[0].$message
    " />
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.hostclub_information
            .host_commit_description
            "
            label="2. Describe how the host sponsor will commit their time and expertise during the implementation of the project to ensure success. Provide specific examples of activities or tasks for which the host sponsor will be responsibility.*" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information
            .host_commit_description.$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information
    .host_commit_description.$errors[0].$message
    " />
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.hostclub_information
            .international_commit_description
            "
            label="3. Describe how the international sponsor will commit their time and expertise during the implementation of the project to ensure success. Provide specific examples of activities or tasks for which the international sponsor will be responsibility.*" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information
            .international_commit_description.$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information
    .international_commit_description.$errors[0].$message
    " />
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.hostclub_information
            .sponsor_publicize_description
            " label="4. How do the sponsors plan to publicize this project?*" />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.hostclub_information
            .sponsor_publicize_description.$error
            " :errorMsg="v$.projectToUpdateOrCreate.hostclub_information
    .sponsor_publicize_description.$errors[0].$message
    " />
        </div>
        <!-- Section C -->
        <h1 class="form_item full_width my-4 text-center underline underline-offset-8" :class="tailwind.H1">
          Section C – Cooperating Organization(s) – upload a copy of the MOU
        </h1>
        <div class="form_item full_width">
          <h3 class="form_item full_width text-center" :class="tailwind.H3">
            Cooperating Organization (if applicable)
          </h3>
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.sectionC
            .cooperating_organizations[0].organization_name
            " label="Name of cooperating organization" />
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.sectionC
            .cooperating_organizations[0].address
            " label="Address" />
        </div>
        <div class="form_item">
          <BaseInputsText label="Email" v-model="projectToUpdateOrCreate.hostclub_information.sectionC
            .cooperating_organizations[0].contact_person.email
            " />
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.sectionC
            .cooperating_organizations[0].contact_person.phone
            " label="Phone" />
        </div>
        <div class="form_item">
          <BaseInputsText v-model="projectToUpdateOrCreate.hostclub_information.sectionC
            .cooperating_organizations[0].contact_person.cell
            " label="Cell / WhatsApp" />
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.hostclub_information.sectionC
            .cooperating_organizations_roles_description
            "
            label="1. Provide background information about the cooperating organization(s) including the role they will play in the project activity." />
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.hostclub_information.sectionC
            .cooperating_organizations_identify_members
            "
            label="2. Identify any members of the host or international sponsors who are project committee members, employees, board members or officers of one of the cooperating organizations." />
        </div>
        <!-- Section D -->
        <h1 class="form_item full_width my-4 text-center underline underline-offset-8" :class="tailwind.H1">
          Section D – Project Planning
        </h1>
        <div class="form_item full_width">
          <BaseTextArea label="1. Describe how the project will benefit the community or address a community need.*"
            v-model="projectToUpdateOrCreate.extra_descriptions
              .benefit_community_description
              " />
          <ErrorValidation v-if="v$.projectToUpdateOrCreate.extra_descriptions
            .benefit_community_description.$error
            " :errorMsg="v$.projectToUpdateOrCreate.extra_descriptions
    .benefit_community_description.$errors[0].$message
    " />
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.extra_descriptions.sectionD
            .project_accountability
            "
            label="2. Who will operate, secure and maintain the items purchased with grant funds and ensure the items are properly maintained and repaired so they continue to function? This includes equipment, assets and materials.*" />
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.extra_descriptions.sectionD
            .ownership_project
            "
            label="3. At the end of the project, who will own the items purchased with grant funds? This includes equipment, assets and materials.Items cannot be owned by a Rotary Club or Rotarian(s).*" />
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.extra_descriptions.sectionD
            .inventory_project
            "
            label="4. Who will maintain an inventory of the items purchased with grant funds including location after distribution?*" />
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.extra_descriptions.sectionD
            .customs_clearance
            "
            label="5. What arrangements have been made for customs clearance if items will be purchased and shipped from outside the project country?*" />
        </div>
        <!-- Section E -->
        <h1 class="form_item full_width my-4 text-center underline underline-offset-8" :class="tailwind.H1">
          Section E – Sustainability and Measurement
        </h1>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.extra_descriptions.sectionE
            .project_capacity
            " label="1. How will the project build capacity in the host community?*" />
        </div>
        <div class="form_item full_width">
          <BaseTextArea v-model="projectToUpdateOrCreate.extra_descriptions.sectionE
            .project_sustainment
            "
            label="2. How will the outcomes of the project be sustained over time after the funding has been expended?*" />
        </div>
        <div class="form_item full_width">
          <div class="my-8">
            <h3 class="form_item full_width " :class="tailwind.LABEL">
              {{
                headerFormatter(
                  `3. Identify how the progress toward the objectives will be measured? Check all that apply & upload
              samples if applicable.* `
                )
              }}
            </h3>
            <BaseCheckBox v-model="projectToUpdateOrCreate.extra_descriptions.sectionE.e.Surveys
                " :label="measurableHtmlList[0]" />
            <BaseCheckBox v-model="projectToUpdateOrCreate.extra_descriptions.sectionE.e
              .Questionnaires
              " :label="measurableHtmlList[1]" />
            <BaseCheckBox v-model="projectToUpdateOrCreate.extra_descriptions.sectionE.e
              .Observations
              " :label="measurableHtmlList[2]" />
            <BaseCheckBox v-model="projectToUpdateOrCreate.extra_descriptions.sectionE.e
              .Tests_Of_Knowledge
              " :label="measurableHtmlList[3]" />
            <BaseCheckBox v-model="projectToUpdateOrCreate.extra_descriptions.sectionE.e.Interviews
              " :label="measurableHtmlList[4]" />
            <BaseCheckBox v-model="projectToUpdateOrCreate.extra_descriptions.sectionE.e
              .Focus_Groups
              " :label="measurableHtmlList[5]" />
            <BaseCheckBox v-model="projectToUpdateOrCreate.extra_descriptions.sectionE.e
              .Video_Media
              " :label="measurableHtmlList[6]" />
            <BaseCheckBox v-model="projectToUpdateOrCreate.extra_descriptions.sectionE.e
              .Documents_Materials_Collections
              " :label="measurableHtmlList[7]" />
          </div>
        </div>
        <!-- Section F -->
        <h1 class="form_item full_width my-4 text-center underline underline-offset-8" :class="tailwind.H1">
          Section F - Budget Summary and Financing Summary
        </h1>

        <h3 class="form_item full_width my-4 text-center text-lg font-bold text-primary-black">
          {{ headerFormatter("Currency Exchange Rate ") }}
        </h3>
        <BaseInputsText class="form_item" v-model="projectToUpdateOrCreate.hostclub_information.sectionF
          .local_currency_name
          " label="Name of Local Currency*" />
        <BaseInputsText class="form_item" v-model="projectToUpdateOrCreate.hostclub_information.sectionF
          .exchange_rate
          " label="Exchange Rate to 1 USD*" />


        <div class="form_item full_width">
          <h3 class="text-center" :class="tailwind.H3">
            {{
              `Provide a complete, detailed and itemised budget for the entire project. \n (Supporting documents may be
            requested) `
            }}
          </h3>
          <n-h3 class="text-center">{{
            "*All Budget Items and Funding Sources will be recorded in USD!"
          }}</n-h3>
        </div>
        <div class="form_item full_width table">
          <div class="relative overflow-x-auto" id="item_table">
            <table class="w-full text-left text-sm text-gray-500">
              <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" :class="tailwind.TABLEHEADER">Item Name</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Supplier</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Cost</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">
                    Local Currency Cost
                  </th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-white">
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="budgetItemName" />
                  </td>
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="budgetSupplierName" />
                  </td>
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="budgetItemCost" />
                  </td>
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="budgetItemCostLocalCurrency" />
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button title="Add item" class="plus_icon hover:text-primary-color" @click="
                      addToBudget(
                        budgetItemName,
                        budgetSupplierName,
                        budgetItemCost,
                        budgetItemCostLocalCurrency
                      )
                      ">
                      <font-awesome-icon icon="fa-solid fa-circle-plus" />
                    </button>
                  </td>
                </tr>
                <tr class="border-b bg-gray-50" id="funding_source" v-for="(
                    item, index
                  ) in projectToUpdateOrCreate.itemized_budget" :key="index">
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.itemName }}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.supplierName }}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.itemCost }}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.itemCostLocalCurrency }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button title="Delete item" class="crud-buttons plus_icon hover:text-primary-color"
                      @click="deleteItemFromBudget(index)">
                      <font-awesome-icon class="social-icon" icon="trash-alt"></font-awesome-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="5" class="border-2 border-primary-color px-6 py-4 text-center font-bold text-gray-900">
                    Total Budget: USD {{ sumOfItemsCost }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="form_item half_width">
          <h3 class="border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black">
            {{
              `District ${store.$state.loggedInUsersDistrict.district_name} will match District club contributions `
            }}
            {{
              "( " +
              store.loggedInUsersDistrict.district_details.ddfCapes.dsgFraction
            }}
            {{ " : 1 ) up to a maximum of" }}
            {{
              store.loggedInUsersDistrict.district_details.ddfCapes.dsgCap +
              " USD "
            }}
            {{ "on a first come basis depending upon availability of DDF" }}
          </h3>
        </div>
        <div class="form_item half_width">
          <h3 class="border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black">
            {{
              `*District ${store.$state.loggedInUsersDistrict.district_name} calculates District Designated Funds from these
            funding sources: `
            }}
            <strong class="text-center text-primary-green">
              {{ fundingSourcesArrary }}</strong>
          </h3>
        </div>
        <div class="form_item half_width">
          <h3 class="border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black">
            {{ "DDF request limit: $" }}
            {{ districtMatchingGrantRequestLimit }} USD
          </h3>
        </div>
        <hr :class="tailwind.FORMHR" />
        <div class="form_item half_width">
          <h3 class="text-center" :class="tailwind.H3">
            {{ "Funding Sources" }}
          </h3>
        </div>
        <div class="form_item full_width table">
          <div class="relative overflow-x-auto">
            <table id="funding_source_table" class="6 w-full text-left text-sm text-gray-500">
              <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" :class="tailwind.TABLEHEADER">#</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Source</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Details</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Amount</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-white">
                  <td class="px-6 py-4">*</td>
                  <td class="px-6 py-4">
                    <BaseSelect :options="addFundingSource" v-model="fundingSources.sourceName" />
                  </td>
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="fundingSources.typeOfFunding" />
                  </td>
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="fundingSources.amount" />
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button title="Add item" class="plus_icon hover:text-primary-color" @click="addToFundsArray()">
                      <font-awesome-icon icon="fa-solid fa-circle-plus" />
                    </button>
                  </td>
                </tr>
                <tr class="border-b bg-gray-50" id="funding_source" v-for="(item, index) in projectToUpdateOrCreate
                  .extra_descriptions.fundingSourceArray" :key="index">
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ index + 1 }}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.sourceName }}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.typeOfFunding }}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.amount }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button title="Delete item" class="crud-buttons" @click="deleteFromFundsArray(index)">
                      <font-awesome-icon class="social-icon plus_icon hover:text-primary-color"
                        icon="trash-alt"></font-awesome-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="5" class="border-2 border-primary-color px-6 py-4 text-center font-bold text-gray-900">
                    Total Funding: USD {{ sumOfAnticipatedFunding }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="form_item half_width">
          <div class="border-2 border-primary-color">
            <h1 class="my-4 text-center font-bold underline-offset-8" :class="tailwind.H1">
              Current Anticipated Funding:
              {{ sumOfAnticipatedFunding }}
            </h1>
            <h1 class="my-4 border-primary-dark-color text-center font-bold underline-offset-8" :class="tailwind.H1">
              Current Funding Goal:
              {{ formatter.format(projectToUpdateOrCreate.funding_goal) }}
            </h1>
            <h1 class="my-4 text-center font-bold underline-offset-8" :class="tailwind.H1">
              Pledge Amount To Date:
              {{ formatter.format(projectToUpdateOrCreate.total_pledges) }}
            </h1>
            <ErrorValidation class="text-center" v-if="v$.projectToUpdateOrCreate.district_matching_grant_request
              .$error
              " :errorMsg="v$.projectToUpdateOrCreate.district_matching_grant_request
    .$errors[0].$message
    " />
            <ErrorValidation class="text-center" v-if="v$.projectToUpdateOrCreate.anticipated_funding.$error" :errorMsg="v$.projectToUpdateOrCreate.anticipated_funding.$errors[0]
              .$message
              " />
          </div>
        </div>
        <div class="form_item full_width">
          <div class="button_row mt-8 flex justify-center gap-4">
            <RotaryButton :label="submitButtonmsg" @click="validateDMProject()" />
            <RotaryButton label="Cancel" @click="redirect()" />
          </div>
        </div>
        <div class="form_item"></div>
        <div class="form_item full_width"></div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Uploads'">
      <UploadForm :projectProp="projectToUpdateOrCreate" />
    </div>
    <div v-else-if="activeTab === 'Pdf'">
      <DMProjectPdf :projectProp="projectToUpdateOrCreate" />
    </div>
    <div v-else-if="activeTab === 'Pledges'">
      <AllPledgesTable class="mt-8" :pledgesProp="projectToUpdateOrCreate.pledgesAssociated" />
    </div>
    <div v-else-if="activeTab === 'Approval'">
      <div class="details my-8 flex flex-col items-center gap-8">
        <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
          Approve Project
        </h1>
        <h6 class="mt-4 text-center font-bold">Project Administrator</h6>
        <ul class="border border-primary-color p-4">
          <li>
            <strong>Name:</strong>
            {{ projectToUpdateOrCreate.projectDetails.creatorData.fullName }}
          </li>
          <li>
            <strong>Email:</strong>
            {{ projectToUpdateOrCreate.projectDetails.creatorData.email }}
          </li>
          <li>
            <strong>Phone:</strong>
            {{ projectToUpdateOrCreate.projectDetails.creatorData.phone }}
          </li>
        </ul>
        <RotaryButton v-if="store.$state.loggedInUserData.role[0].district_role ===
          'District Admin' ||
          store.$state.loggedInUserData.role[0].district_role ===
          'District Grants Chair'
          " label="Approve" @click="approveProject()" />
        <h6 v-else class="mt-4 text-center font-bold">
          Must be a District Admin / Grants Chair to approve
        </h6>
      </div>
      <div v-if="projectToUpdateOrCreate.project_status === 'Reports Due'" class="flex flex-col gap-8">
        <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
          Approve Reports
        </h1>
        <div class="flex justify-center">
          <RotaryButton v-if="store.$state.loggedInUserData.role[0].district_role ===
            'District Admin' ||
            store.$state.loggedInUserData.role[0].district_role ===
            'District Grants Chair' ||
            store.$state.loggedInUserData.role[0].district_role ===
            'District Foundations Chair' ||
            store.$state.loggedInUserData.role[0].district_role ===
            'District International Chair'
            " label="Approve Reports" @click="approveReports()" />
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Share'">
      <div class="share mt-8 flex justify-center">
        <button class="inline-flex items-center rounded-full bg-blue-700 py-2 px-4 text-white hover:bg-blue-800">
          <font-awesome-icon class="mr-4 text-4xl text-primary-white" icon="fa-brands fa-square-facebook" />

          <ShareNetwork network="facebook" :url="$data.urlForShare" :title="$data.projectToUpdateOrCreate.project_name"
            :description="$data.projectToUpdateOrCreate.project_description"
            quote="Check Out this rotary project and make a pledge!" hashtags="myrotaryprojects," class="link">
            Share this Project On Facebook
          </ShareNetwork>
        </button>
      </div>
    </div>
    <div v-else-if="activeTab === 'Add Users'">
      <AddUserProjectForm :projectAdminsProp="projectToUpdateOrCreate.projectDetails.projectAdmins
        " :projectId="projectToUpdateOrCreate.project_id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useNotification } from "naive-ui";
import type { NotificationType } from "naive-ui";

import {
  FORM_MODE_PROP,
  MyError,
  TAILWIND_COMMON_CLASSES,
  type IApiError,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import AllPledgesTable from "@/components/common/tables/AllPledgesTable.vue";

import DMProjectPdf from "@/components/common/pdf/DMProjectPdf.vue";
import { ErrorMessages } from "@/utils/frontend/interfaces/Frontend";
import BaseDatePicker from "@/components/common/baseformComponents/BaseDatePicker.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import BaseFileUpload from "@/components/common/baseformComponents/BaseFileUpload.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import BaseCheckBox from "@/components/common/baseformComponents/BaseCheckBox.vue";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";
import BaseTextArea from "@/components/common/baseformComponents/BaseTextArea.vue";
import useVuelidate from "@vuelidate/core";
import { useRotaryStore } from "@/stores/rotaryStore";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import type {
  FundingSource,
  IDmProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from "@vuelidate/validators";
import Utilities from "@/utils/frontend/classes/Utilities";
import DsgProject from "@/utils/shared/classes/DsgProject";
import {
  GrantType,
  ProjectStatus,
} from "@/utils/shared/interfaces/SharedInterface";
import ProjectsApi from "@/services/Projects";
import ErrorModal from "@/components/common/modals/ErrorModal.vue";
import UploadForm from "@/components/common/forms/UploadForm.vue";
import AddUserProjectForm from "@/components/common/forms/AddUserProjectForm.vue";
import DmProject from "@/utils/shared/classes/DmProject";
import fastDeepEqual from "fast-deep-equal";

interface ImageType {
  label: string;
  key: string;
  [key: string]: string;
}
export default defineComponent({
  name: "DistrictMatchingProjectForm",
  components: {
    RotaryButton,
    BaseFileUpload,
    BaseSelect,
    BaseCheckBox,
    BaseInputsText,
    BaseTextArea,
    BaseInputsTextEmail,
    BaseDatePicker,
    ErrorValidation,
    ErrorModal,
    UploadForm,
    DMProjectPdf,
    AllPledgesTable,
    AddUserProjectForm,
  },
  props: {},
  setup() {
    const notification = useNotification();
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const store = useRotaryStore();
    const v$ = useVuelidate();
    return {
      showModal: ref(false),
      toastController(
        type: NotificationType,
        title?: string,
        content?: string,
        duration?: number,
        closable?: boolean
      ) {
        notification[type]({
          title: title || "Error",
          duration: duration || 3000,
          closable: closable || false,
          content: content || "",
        });
      },
      v$,
      store,
      formatter,
    };
  },
  data() {
    return {
      activeTab: "Form",
      tabs: [
        { name: "Form", label: "DMG Form" },
        { name: "Uploads", label: "Uploads" },
        { name: "Pdf", label: "Pdf" },
        { name: "Approval", label: "Approval" },
        { name: "Pledges", label: "Pledges" },
        { name: "Share", label: "Share" },
        { name: "Add Users", label: "Add Users" },
      ],
      tailwind: TAILWIND_COMMON_CLASSES,
      headerFormatter: Utilities.headerFormater,
      criteriaList: ResourceLists.districtMatchingCriteria,
      projectToUpdateOrCreate: new DmProject() as IDmProject,
      countryList: ResourceLists.countryList,
      areaFocusImages: ResourceLists.areaFocusImages,
      regionList: ResourceLists.regionList,
      areaFocusList: [] as Array<ImageType>,
      submitButtonmsg: "Submit",
      urlForShare: "",
      budgetItemName: "",
      budgetItemCost: "",
      budgetSupplierName: "",
      budgetItemCostLocalCurrency: "",
      addFundingSource: [
        "District Designated Funds Request (DDF)",
        "District Club Contribution",
        "Non-District Club Contribution",
        "Co-operating Organization Contribution",
        "Other sources",
      ],
      fundingSources: {} as FundingSource,
      expectionObject: {} as IApiException,
      projectApproval: "",
      objectiveItem: "",
      measurableHtmlList: ResourceLists.measurableList,
      allowedToLeaveForm: false,
      submited: false,
      serverException: false,
      initialProject: {} as IDmProject,
    };
  },
  watch: {
    projectToUpdateOrCreate: {
      handler() {
        if (fastDeepEqual(this.projectToUpdateOrCreate, this.initialProject)) {
          this.store.$state.canLeaveForm = true;
        } else {
          this.store.$state.canLeaveForm = false;
        }
      },
      deep: true,
    },
  },
  validations() {
    return {
      projectToUpdateOrCreate: {
        project_name: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: helpers.withMessage(
            ErrorMessages.PROJECT_NAME_LIMIT,
            maxLength(50)
          ),
        },
        project_description: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(3000),
          minLength: minLength(100),
        },
        area_focus: {
          oneMustBeSelected: helpers.withMessage(
            ErrorMessages.ONE_MUST_BE_SELECTED,
            () => {
              const areaFocusValues = Object.values(
                this.projectToUpdateOrCreate.area_focus
              );
              return areaFocusValues.includes(true);
            }
          ),
        },
        country: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        },
        region: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        },
        funding_goal: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxAmount: helpers.withMessage(
            ErrorMessages.MAX_AMOUNT,
            (value: number) => value <= 100000000
          ),
        },
        anticipated_funding: {
          lowerThanFundingGoal: helpers.withMessage(
            ErrorMessages.LOWER_THAN_FUNDING_GOAL,
            () => {
              if (
                parseFloat(
                  this.projectToUpdateOrCreate.anticipated_funding.toFixed(2)
                ) <=
                parseFloat(this.projectToUpdateOrCreate.funding_goal.toFixed(2))
              ) {
                return true;
              } else {
                return false;
              }
            }
          ),
          cantBeLowerThanPledgesTotal: helpers.withMessage(
            ErrorMessages.CANT_BE_LOWER_THAN_PLEDGES_TOTAL,
            () => {
              if (
                parseFloat(
                  this.projectToUpdateOrCreate.anticipated_funding.toFixed(2)
                ) >=
                parseFloat(
                  this.projectToUpdateOrCreate.total_pledges.toFixed(2)
                )
              ) {
                return true;
              } else {
                return false;
              }
            }
          ),
        },
        start_date: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        },
        completion_date: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          dateAfterStartDate: helpers.withMessage(
            ErrorMessages.DATE_AFTER_START_DATE,
            () => {
              const projectStartDate = new Date(
                this.projectToUpdateOrCreate.start_date
              );
              const completionDate = new Date(
                this.projectToUpdateOrCreate.completion_date
              );
              return completionDate > projectStartDate;
            }
          ),
        },
        extra_descriptions: {
          benefit_community_description: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
            maxLength: maxLength(2000),
            minLength: minLength(150),
          },
          non_financial_participation: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
            maxLength: maxLength(2000),
            minLength: minLength(150),
          },
          primary_contact: {
            address: {
              required: helpers.withMessage(
                ErrorMessages.REQURIED_FIELD,
                required
              ),
            },
            email: {
              required: helpers.withMessage(
                ErrorMessages.REQURIED_FIELD,
                required
              ),
              email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
            },
            name: {
              required: helpers.withMessage(
                ErrorMessages.REQURIED_FIELD,
                required
              ),
            },
            phone: {
              required: helpers.withMessage(
                ErrorMessages.REQURIED_FIELD,
                required
              ),
            },
          },
        },
        district_matching_grant_request: {
          validateRequest: helpers.withMessage(
            "You have exceeded the maximum amount for your Grant Request. Please adjust.",
            () => {
              if (
                parseFloat(
                  this.projectToUpdateOrCreate.district_matching_grant_request.toFixed(
                    2
                  )
                ) > this.districtMatchingGrantRequestLimit
              ) {
                return false;
              } else {
                return true;
              }
            }
          ),
        },
        hostclub_information: {
          host_club_name: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
          },
          district_number: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
          },
          district_country: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
          },
          host_primary_contact: {
            name: {
              required: helpers.withMessage(
                ErrorMessages.REQURIED_FIELD,
                required
              ),
            },
            address: {
              required: helpers.withMessage(
                ErrorMessages.REQURIED_FIELD,
                required
              ),
            },
            email: {
              required: helpers.withMessage(
                ErrorMessages.REQURIED_FIELD,
                required
              ),
              email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
            },
            phone: {
              required: helpers.withMessage(
                ErrorMessages.REQURIED_FIELD,
                required
              ),
            },
          },
          location_city: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
          },
          host_sponsor_planned_project_description: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
            maxLength: maxLength(3000),
            minLength: minLength(100),
          },
          host_commit_description: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
            maxLength: maxLength(3000),
            minLength: minLength(100),
          },
          international_commit_description: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
            maxLength: maxLength(3000),
            minLength: minLength(100),
          },
          sponsor_publicize_description: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
            maxLength: maxLength(3000),
            minLength: minLength(100),
          },
          sectionF: {
            // required:helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          },
        },
      },
    };
  },
  async created() {
    if (this.store.$state.DsgOrDMProjectFormProps.formModeProp === "UPDATE") {
      this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
      await this.populateFormData();
    } else if (
      this.store.$state.DsgOrDMProjectFormProps.formModeProp === "CREATE"
    ) {
      this.tabs = [{ name: "Form", label: "Form" }];
      this.projectToUpdateOrCreate = new DmProject();
      this.initialProject = { ...this.projectToUpdateOrCreate };
      this.projectToUpdateOrCreate.grant_type =
        GrantType.DISTRICTMATCHINGPROJECT;
      this.projectToUpdateOrCreate.created_by = this.store.$state
        .loggedInUserData.user_id as number;
      this.projectToUpdateOrCreate.club_id =
        this.store.$state.DsgOrDMProjectFormProps.isAdminOverrideClubIdProp ??
        this.store.$state.loggedInUserData.club_id;

      if (
        (this.store.$state.loggedInUserData.district_id as number) ||
        this.store.$state.loggedInUsersDistrict.district_id
      ) {
        this.projectToUpdateOrCreate.district_id =
          (this.store.$state.loggedInUserData.district_id as number) ||
          this.store.$state.loggedInUsersDistrict.district_id;
      } else throw new Error("No District Id");
    }
    this.areaFocusList = Object.keys(
      this.projectToUpdateOrCreate.area_focus
    ).map((key) => {
      return {
        label: key.replace(/_/g, " "),
        key: key,
      };
    });
  },
  methods: {
    async populateFormData(responseProjectId?: number) {
      try {
        const response = await ProjectsApi.getProjectById(
          responseProjectId
            ? responseProjectId
            : (this.store.$state.DsgOrDMProjectFormProps
              .porjectIdProp as number)
        );
        if (!Utilities.isAnApiError(response)) {
          this.projectToUpdateOrCreate = response as IDmProject;
          this.initialProject = { ...this.projectToUpdateOrCreate };
          this.urlForShare =
            "https://myrotaryprojects.org/" +
            "project/" +
            this.projectToUpdateOrCreate.project_id;
        } else throw new MyError((response as IApiError).message);
      } catch (error) {
        console.log(error);
        this.toastController(
          "error",
          "Error",
          "Error while populating form data. Please try again.",
          3000,
          false
        );
      }
    },
    async approveReports() {
      try {
        const response = await ProjectsApi.updateProjectStatus(
          this.projectToUpdateOrCreate.project_id as number,
          ProjectStatus.COMPLETED
        );
        if (!Utilities.isAnApiError(response) && response === true) {
          this.toastController(
            "success",
            "Success",
            "Project Approved Successfully"
          );
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.expectionObject = error as IApiException;
      }
    },
    addToFundsArray() {
      try {
        if (
          this.fundingSources.amount < 0 ||
          isNaN(this.fundingSources.amount)
        ) {
          const errorMsg = isNaN(this.fundingSources.amount)
            ? "Amount is not a number"
            : "Amount cannot be negative";
          this.toastController("error", "Error", errorMsg, 2000);
          this.fundingSources.amount = 0;
          return;
        }
        let fundingSourceAmountParsed = parseFloat(
          this.fundingSources.amount as unknown as string
        );
        fundingSourceAmountParsed = parseFloat(
          fundingSourceAmountParsed.toFixed(2)
        );
        switch (this.fundingSources.sourceName) {
          case "District Club Contribution":
            this.projectToUpdateOrCreate.intial_sponsor_club_contribution =
              parseFloat(
                (
                  this.projectToUpdateOrCreate
                    .intial_sponsor_club_contribution +
                  fundingSourceAmountParsed
                ).toFixed(2)
              );
            break;

          case "Non-District Club Contribution":
            this.projectToUpdateOrCreate.extra_descriptions.other_club_contribution =
              parseFloat(
                (
                  this.projectToUpdateOrCreate.extra_descriptions
                    .other_club_contribution + fundingSourceAmountParsed
                ).toFixed(2)
              );
            break;

          case "District Designated Funds Request (DDF)":
            let futureDdfAmount = parseFloat(
              (
                this.projectToUpdateOrCreate.district_matching_grant_request +
                fundingSourceAmountParsed
              ).toFixed(2)
            );
            if (
              fundingSourceAmountParsed >
              this.districtMatchingGrantRequestLimit ||
              futureDdfAmount > this.districtMatchingGrantRequestLimit
            ) {
              this.toastController(
                "error",
                "Error",
                "The maximum amount for a Grant Request exceeded. Please adjust the amount.",
                2000
              );
              this.fundingSources = {} as FundingSource;
              return;
            } else {
              this.projectToUpdateOrCreate.district_matching_grant_request =
                futureDdfAmount;
            }
            break;

          case "Co-operating Organization Contribution":
            this.projectToUpdateOrCreate.co_operating_organisation_contribution =
              parseFloat(
                (
                  this.projectToUpdateOrCreate
                    .co_operating_organisation_contribution +
                  fundingSourceAmountParsed
                ).toFixed(2)
              );
            break;

          case "Other sources":
            this.projectToUpdateOrCreate.extra_descriptions.other_sources =
              parseFloat(
                (
                  this.projectToUpdateOrCreate.extra_descriptions
                    .other_sources + fundingSourceAmountParsed
                ).toFixed(2)
              );
            break;

          default:
            break;
        }
        this.fundingSources.amount = fundingSourceAmountParsed;
        this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.push(
          this.fundingSources
        );
      } catch (error) {
        this.toastController(
          "error",
          "Error",
          "Error while adding to funds array. Please try again.",
          3000,
          false
        );
        console.error(error);
      }
      this.fundingSources = {} as FundingSource;
    },
    deleteFromFundsArray(index: number) {
      try {
        const fundingSource =
          this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray[
          index
          ];

        switch (fundingSource.sourceName) {
          case "District Club Contribution":
            this.projectToUpdateOrCreate.intial_sponsor_club_contribution -=
              parseFloat(fundingSource.amount.toFixed(2));
            break;

          case "Non-District Club Contribution":
            this.projectToUpdateOrCreate.extra_descriptions.other_club_contribution -=
              parseFloat(fundingSource.amount.toFixed(2));
            break;

          case "District Designated Funds Request (DDF)":
            this.projectToUpdateOrCreate.district_matching_grant_request -=
              parseFloat(fundingSource.amount.toFixed(2));
            break;

          case "Co-operating Organization Contribution":
            this.projectToUpdateOrCreate.co_operating_organisation_contribution -=
              parseFloat(fundingSource.amount.toFixed(2));
            break;

          case "Other sources":
            this.projectToUpdateOrCreate.extra_descriptions.other_sources -=
              parseFloat(fundingSource.amount.toFixed(2));
            break;

          default:
            break;
        }
        this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.splice(
          index,
          1
        );
      } catch (error) {
        this.toastController(
          "error",
          "Error",
          "Error while deleting from funds array. Please try again.",
          3000,
          false
        );
        console.error(error);
      }
    },
    addToBudget(
      itemName: string,
      supplierName: string,
      itemCost: string,
      itemCostLocal: string
    ) {
      let itemCostParsed = parseFloat(itemCost);
      try {
        if (itemCostParsed < 0 || isNaN(itemCostParsed)) {
          const errorMsg = isNaN(itemCostParsed)
            ? "Invalid cost"
            : "Cost cannot be negative";
          this.toastController("error", "Invalid cost", errorMsg, 3000, true);
          this.budgetItemCost = "";
          return;
        }

        const budgetItemObject = {
          itemCost: parseFloat(itemCostParsed.toFixed(2)),
          itemName: itemName,
          supplierName: supplierName,
          itemCostLocalCurrency: parseFloat(itemCostLocal),
        };

        this.projectToUpdateOrCreate.funding_goal += budgetItemObject.itemCost;
        this.projectToUpdateOrCreate.itemized_budget.push(budgetItemObject);

        this.budgetItemCost = "";
        this.budgetItemName = "";
        this.budgetItemCostLocalCurrency = "";
        this.budgetSupplierName = "";
      } catch (error) {
        this.toastController(
          "error",
          "Error",
          "Error while adding to budget. Please try again.",
          3000,
          false
        );
        console.error(error);
      }
    },
    deleteItemFromBudget(index: number) {
      try {
        const item = this.projectToUpdateOrCreate.itemized_budget[index];
        this.projectToUpdateOrCreate.itemized_budget.splice(index, 1);
        this.projectToUpdateOrCreate.funding_goal = parseFloat(
          (this.projectToUpdateOrCreate.funding_goal - item.itemCost).toFixed(2)
        );
      } catch (error) {
        this.toastController(
          "error",
          "Error",
          "Error while deleting budget item. Please try again.",
          3000,
          false
        );
        console.error(error);
      }
    },

    async approveProject() {
      try {
        if (
          this.projectToUpdateOrCreate.project_status !==
          ProjectStatus.PENDINGAPPROVAL
        ) {
          this.toastController(
            "error",
            "Approval Error",
            "Project has not been submitted for approval.",
            3000,
            true
          );
          return;
        }

        const response = await ProjectsApi.updateProjectStatus(
          this.projectToUpdateOrCreate.project_id as number,
          ProjectStatus.APPROVED
        );

        if (!Utilities.isAnApiError(response) && response === true) {
          this.toastController(
            "success",
            "Success",
            this.headerFormatter("Project Approved"),
            3000,
            true
          );
          setTimeout(async () => {
            this.$router.push("/");
          }, 3000);
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.expectionObject = error as IApiException;
        this.showModal = true;
      }
    },

    async createDMProject() {
      try {
        const response = await ProjectsApi.createNewProject(
          this.projectToUpdateOrCreate
        );
        if (!Utilities.isAnApiError(response)) {
          this.tabs = ResourceLists.formTabs;
          window.scrollTo(0, 0);
          this.toastController(
            "success",
            "Success",
            this.headerFormatter(
              "Project Created. You can begin uploading files"
            ),
            3500,
            true
          );
          this.store.setDSGOrDMFormProps({
            formModeProp: "UPDATE",
            porjectIdProp: response as number,
          });

          this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
          setTimeout(async () => {
            await this.populateFormData(response as number);
          }, 3500);
        }
      } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
          this.duplicateNamesToast();
          return;
        }
        this.expectionObject = error as IApiException;
        this.showModal = true;
      }
    },
    async updateDMProject() {
      try {
        const response = await ProjectsApi.updateProject(
          this.projectToUpdateOrCreate
        );
        if (!Utilities.isAnApiError(response)) {
          this.toastController(
            "success",
            "Success",
            this.headerFormatter("Project Updated"),
            3500,
            true
          );
          setTimeout(() => {
            this.redirect();
          }, 3500);
        }
      } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
          this.duplicateNamesToast();
          return;
        }
        this.showModal = true;
        this.expectionObject = error as IApiException;
      }
    },
    async validateDMProject(): Promise<void> {
      await this.v$.$validate();

      if (this.v$.$error) {
        this.toastController("error", "Error", "Fix Form Errors", 4000, true);
        return;
      }

      if (!this.v$.$error) {
        const formMode = this.store.$state.DsgOrDMProjectFormProps.formModeProp;

        if (formMode === "CREATE") {
          this.createDMProject();
        } else if (formMode === "UPDATE") {
          this.updateDMProject();
        }
      }
    },
    async addToObjectives(objectiveItem: string) {
      this.projectToUpdateOrCreate.hostclub_information.listOfObjectives.push(
        objectiveItem
      );
      this.objectiveItem = "";
    },
    deleteObjectiveByIndex(index: number) {
      this.projectToUpdateOrCreate.hostclub_information.listOfObjectives.splice(
        index,
        1
      );
    },
    formatterMoney(amount: number) {
      if (amount) {
        return `Total Pledges: ${this.currencyFormatter(amount)}`;
      } else {
        return this.headerFormatter(
          "Total Pledge Amount not available check pledges tab"
        );
      }
    },
    currencyFormatter(amount: number): string {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(amount);
    },
    duplicateNamesToast() {
      this.toastController(
        "error",
        "Error",
        "Project name already exists. Please choose another name.",
        3500,
        true
      );
    },
    redirect() {
      this.store.$state.canLeaveForm = true;
      this.$router.go(-1);
    },
  },
  computed: {
    sumOfAnticipatedFunding(): string {
      let sum: number = 0;
      this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.forEach(
        (el: { amount: number }) => {
          sum += parseFloat(el.amount.toFixed(2));
        }
      );
      const total =
        sum + parseFloat(this.projectToUpdateOrCreate.total_pledges.toFixed(2));
      this.projectToUpdateOrCreate.anticipated_funding = total;
      return this.currencyFormatter(total);
    },

    // Calculate sum of costs for all items in itemized_budget and convert it to USD format
    sumOfItemsCost(): string {
      let sum: number = 0;
      this.projectToUpdateOrCreate.itemized_budget.forEach(
        (item: { itemCost: number }) => {
          sum += parseFloat(item.itemCost.toFixed(2));
        }
      );
      this.projectToUpdateOrCreate.funding_goal = sum;
      return this.currencyFormatter(sum);
    },

    // Transform array of funding sources from ddfCalculation into a formatted string
    fundingSourcesArrary(): string {
      const sourcesArray =
        this.store.loggedInUsersDistrict.district_details.ddfCalculation.map(
          (ele: { toString: () => string }) => ` ${ele.toString()}`
        );
      return sourcesArray.join(", ");
    },

    districtMatchingGrantRequestLimit() {
      const cap = parseFloat(
        this.store.loggedInUsersDistrict.district_details.ddfCapes
          .dmCap as unknown as string
      );
      const fraction = parseFloat(
        this.store.loggedInUsersDistrict.district_details.ddfCapes
          .dmFraction as unknown as string
      );
      let total = 0;
      this.store.loggedInUsersDistrict.district_details.ddfCalculation.forEach(
        (ele) => {
          this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.forEach(
            (el: { sourceName: string; amount: number }) => {
              if (el.sourceName === ele) {
                total += parseFloat(el.amount.toFixed(2));
              }
            }
          );
        }
      );
      const limit = total < cap ? total * fraction : cap;
      return parseFloat(limit.toFixed(2));
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";

#item_table {
  table {
    width: 100%;
  }

  table th:nth-child(1) {
    /* Set the width for the first column */
    width: 45%;
  }

  table th:nth-child(2) {
    /* Set the width for the second column */
    width: 45%;
  }

  table th:nth-child(3) {
    /* Set the width for the third column */
    width: 10%;
  }
}

.plus_icon {
  font-size: 1.5rem;
}
</style>
