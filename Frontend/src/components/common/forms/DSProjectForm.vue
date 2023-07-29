<template>
  <div class="landing_header w-full">
    <h1 class="header2_h1">District Simplified Project Form</h1>
  </div>
  <!-- Form Tabs Ui -->
  <ul
    class="flex flex-wrap justify-center border-b border-gray-200 text-center text-lg font-semibold text-primary-black"
  >
    <li class="mr-2">
      <h1
        aria-current="page"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black"
        :class="activeTab1"
        @click="setTab(1)"
      >
        Form
      </h1>
    </li>
    <li class="mr-2">
      <h1
        @click="setTab(2)"
        :class="activeTab2"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Uploads
      </h1>
    </li>
    <li class="mr-2">
      <h1
        @click="setTab(3)"
        :class="activeTab3"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Pdf
      </h1>
    </li>
    <li class="mr-2">
      <h1
        v-if="store.$state.DsgOrDMProjectFormProps.formModeProp === 'UPDATE'"
        @click="setTab(4)"
        :class="activeTab4"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Pledges
      </h1>
    </li>
    <li class="mr-2">
      <h1
        v-if="
          store.$state.DsgOrDMProjectFormProps.formModeProp === 'UPDATE' &&
          (store.$state.loggedInUserData.role[0].district_role ===
            'District Admin' ||
            store.$state.loggedInUserData.role[0].district_role ===
              'District Grants Chair' ||
            store.$state.loggedInUserData.role[0].district_role ===
              'District Foundations Chair' ||
            store.$state.loggedInUserData.role[0].district_role ===
              'District International Chair')
        "
        @click="setTab(5)"
        :class="activeTab5"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Approvals
      </h1>
    </li>
    <li class="mr-2">
      <h1
        v-if="store.$state.DsgOrDMProjectFormProps.formModeProp === 'UPDATE'"
        @click="setTab(6)"
        :class="activeTab6"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Share
      </h1>
    </li>
    <li class="mr-2">
      <h1
        v-if="store.$state.DsgOrDMProjectFormProps.formModeProp === 'UPDATE'"
        @click="setTab(7)"
        :class="activeTab7"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Add Users
      </h1>
    </li>
  </ul>
  <div class="dsg_tabs mt-8 px-24 pb-24">
    <div class="form_tab" v-if="activeTab1">
      <div class="wrapper my-8 min-w-full gap-8" :class="tailwind.DIVCOL">
        <div class="wrapper" :class="tailwind.DIVCOL">
          <Toast
            v-if="toast.display"
            :msg="toast.msg"
            :width="toast.width"
            :closeTimer="toast.closeTimer"
          />
          <ExceptionModal
            v-if="serverException"
            :message="expectionObject.message"
            :stackTrace="expectionObject.stack"
            :toggleModel="true"
          />
          <h1
            class="my-4 text-center font-bold underline underline-offset-8"
            :class="tailwind.H1"
          >
            District Simplified Grants Club Application Form Criteria
          </h1>
          <ul class="my-8">
            <li
              class="list-disc"
              v-for="listItem in criteriaList"
              :key="listItem"
            >
              {{ listItem }}
            </li>
          </ul>
          <hr class="my-4 h-px w-full border-0 bg-gray-500" />

          <form class="w-1/2" @submit.prevent="" novalidate>
            <h1
              class="my-4 text-center font-bold underline underline-offset-8"
              :class="tailwind.H1"
            >
              Section A
            </h1>
            <BaseInputsText
              label="Project Name"
              v-model="projectToUpdateOrCreate.project_name"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.project_name.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.project_name.$errors[0].$message
              "
            />
            <BaseTextArea
              v-model="projectToUpdateOrCreate.project_description"
              label="Description"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.project_description.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.project_description.$errors[0]
                  .$message
              "
            />
            <BaseSelect
              v-model="projectToUpdateOrCreate.country"
              :options="countryList"
              label="Country"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.country.$error"
              :errorMsg="v$.projectToUpdateOrCreate.country.$errors[0].$message"
            />
            <BaseSelect
              v-model="projectToUpdateOrCreate.region"
              :options="regionList"
              label="Region"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.region.$error"
              :errorMsg="v$.projectToUpdateOrCreate.region.$errors[0].$message"
            />
            <!-- <span
              v-if="
                store.$state.DsgOrDMProjectFormProps.formModeProp ===
                  'UPDATE' &&
                v$.projectToUpdateOrCreate.anticipated_funding.$error
              "
              :error-msg="formatterMoney(projectToUpdateOrCreate.total_pledges)"
            ></span> -->

            <BaseDatePicker
              v-model="projectToUpdateOrCreate.start_date"
              label="Project Start Date"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.start_date.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.start_date.$errors[0].$message
              "
            />
            <BaseDatePicker
              v-model="projectToUpdateOrCreate.completion_date"
              label="Project Completion Date"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.completion_date.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.completion_date.$errors[0].$message
              "
            />
            <div class="flex flex-col">
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[0]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus.Peace_Conflict_Prevention
                  "
                  :label="areaFocusList.find(area => area.key === 'Peace_Conflict_Prevention')?.label"
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[1]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus
                      .Disease_Prevention_And_Treatment
                  "
                  :label="areaFocusList.find(area => area.key === 'Disease_Prevention_And_Treatment')?.label"
                                  />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[2]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus.Water_And_Sanitation
                  "
                  :label="areaFocusList.find(area => area.key === 'Water_And_Sanitation')?.label"
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[3]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus.Maternal_And_Child_Health
                  "
                  :label="areaFocusList.find(area => area.key === 'Maternal_And_Child_Health')?.label"
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[4]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus
                      .Basic_Education_And_Literacy
                  "
                  :label="areaFocusList.find(area => area.key === 'Basic_Education_And_Literacy')?.label"
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[5]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus
                      .Economic_And_Community_Development
                  "
                  :label="areaFocusList.find(area => area.key === 'Economic_And_Community_Development')?.label"
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[6]" alt="" />
                <BaseCheckBox
                  v-model="projectToUpdateOrCreate.area_focus.Environment"
                  :label="areaFocusList.find(area => area.key === 'Environment')?.label"
                />
              </div>
            </div>
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.area_focus.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.area_focus.$errors[0].$message
              "
            />
            <h1
              class="my-4 text-center font-bold underline underline-offset-8"
              :class="tailwind.H1"
            >
              Section B
            </h1>
            <BaseTextArea
              label="1. Describe how the project will benefit the community or address a community need.*"
              v-model="
                projectToUpdateOrCreate.extra_descriptions
                  .benefit_community_description
              "
            />
            <ErrorValidation
              v-if="
                v$.projectToUpdateOrCreate.extra_descriptions
                  .benefit_community_description.$error
              "
              :errorMsg="
                v$.projectToUpdateOrCreate.extra_descriptions
                  .benefit_community_description.$errors[0].$message
              "
            />
            <BaseTextArea
              label="2. Describe the non-financial participation by Rotarians in the project.*"
              v-model="
                projectToUpdateOrCreate.extra_descriptions
                  .non_financial_participation
              "
            />
            <ErrorValidation
              v-if="
                v$.projectToUpdateOrCreate.extra_descriptions
                  .non_financial_participation.$error
              "
              :errorMsg="
                v$.projectToUpdateOrCreate.extra_descriptions
                  .non_financial_participation.$errors[0].$message
              "
            />
            <BaseTextArea
              label="3. If a co-operating organisation will be involved in the project, provide a letter stating its role in the project and how Rotarians will interface with the organisation."
              v-model="
                projectToUpdateOrCreate.extra_descriptions
                  .co_operating_organisation_letter
              "
            />
            <h3 class="my-4 text-center text-lg font-bold text-primary-black">
              {{
                headerFormatter(
                  "Primary and Optional Seconday contacts for this project"
                )
              }}
            </h3>
            <BaseInputsText
              label="Primary Contact Name*"
              v-model="
                projectToUpdateOrCreate.extra_descriptions.primary_contact.name
              "
            />
            <ErrorValidation
              v-if="
                v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                  .name.$error
              "
              :errorMsg="
                v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                  .name.$errors[0].$message
              "
            />
            <BaseInputsText
              label="Primary Contact Address*"
              v-model="
                projectToUpdateOrCreate.extra_descriptions.primary_contact
                  .address
              "
            />
            <ErrorValidation
              v-if="
                v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                  .address.$error
              "
              :errorMsg="
                v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                  .address.$errors[0].$message
              "
            />
            <BaseInputsText
              label="Primary Contact Email*"
              v-model="
                projectToUpdateOrCreate.extra_descriptions.primary_contact.email
              "
            />
            <ErrorValidation
              v-if="
                v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                  .email.$error
              "
              :errorMsg="
                v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                  .email.$errors[0].$message
              "
            />
            <BaseInputsText
              label="Primary Contact Phone*"
              v-model="
                projectToUpdateOrCreate.extra_descriptions.primary_contact.phone
              "
            />
            <ErrorValidation
              v-if="
                v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                  .phone.$error
              "
              :errorMsg="
                v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                  .phone.$errors[0].$message
              "
            />
            <hr class="my-16 h-px w-full border-0 bg-gray-500" />

            <BaseInputsText
              label="Secondary Contact Name"
              v-model="
                projectToUpdateOrCreate.extra_descriptions.secondary_contact
                  .name
              "
            />
            <BaseInputsText
              label="Secondary Contact Address"
              v-model="
                projectToUpdateOrCreate.extra_descriptions.secondary_contact
                  .address
              "
            />
            <BaseInputsText
              label="Secondary Contact Email"
              v-model="
                projectToUpdateOrCreate.extra_descriptions.secondary_contact
                  .email
              "
            />
            <BaseInputsText
              label="Secondary Contact Phone"
              v-model="
                projectToUpdateOrCreate.extra_descriptions.secondary_contact
                  .phone
              "
            />
            <h1
              class="my-4 text-center font-bold underline underline-offset-8"
              :class="tailwind.H1"
            >
              Section C
            </h1>
            <h3 class="my-4 text-center text-lg font-bold text-primary-black">
              {{
                headerFormatter(
                  "Provide a complete, detailed and itemised budget for the entire project. ( Supporting documents may be requested )"
                )
              }}
            </h3>
            <h3 class="my-4 text-center text-lg font-bold text-primary-black">
              {{
                headerFormatter(
                  "All Budget Items and Funding Sources will be recorded in USD!"
                )
              }}
            </h3>
            <!--         Budget table          -->
            <table
              class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
            >
              <thead
                class="t_head text-s bg-primary-black uppercase text-primary-white"
              >
                <tr>
                  <th>Item Name</th>
                  <th>Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border bg-white">
                  <td class="px-6 py-4 text-primary-black">
                    <BaseInputsText v-model="budgetItemName" />
                  </td>
                  <td class="px-6 py-4 text-primary-black">
                    <BaseInputsText v-model="budgetItemCost" />
                  </td>
                  <td class="px-6 py-4 text-primary-black">
                    <button
                      title="Add item"
                      class="crud-buttons text-lg hover:text-primary-color"
                      @click="addToBudget(budgetItemName, budgetItemCost)"
                    >
                      <font-awesome-icon icon="fa-solid fa-circle-plus" />
                    </button>
                  </td>
                </tr>
                <tr
                  class="border bg-white"
                  id="funding_source"
                  v-for="(
                    item, index
                  ) in projectToUpdateOrCreate.itemized_budget"
                  :key="index"
                >
                  <th
                    scope="row"
                    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {{ item.itemName }}
                  </th>
                  <td class="px-6 py-4 text-primary-black">
                    {{ item.itemCost }}
                  </td>
                  <td class="px-6 py-4 text-primary-black">
                    <button
                      title="Delete item"
                      class="crud-buttons"
                      @click="deleteItemByIndex(index)"
                    >
                      <font-awesome-icon
                        class="social-icon"
                        icon="trash-alt"
                      ></font-awesome-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="">
                  <th></th>
                  <th
                    class="border-2 border-primary-color px-6 py-4 font-bold text-primary-black"
                  >
                    Total Budget:
                  </th>
                  <th
                    class="whitespace-nowrap border-2 border-primary-color px-6 py-4 font-bold text-primary-black"
                  >
                    USD {{ sumOfItemsCost }}
                  </th>
                </tr>
              </tfoot>
            </table>
            <h1
              class="my-4 text-center font-bold underline underline-offset-8"
              :class="tailwind.H1"
            >
              Section D
            </h1>
            <h3
              class="my-4 border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black"
            >
              {{
                headerFormatter(
                  "Your District will match District club contributions "
                )
              }}
              {{
                "( " +
                store.loggedInUsersDistrict.district_details.ddfCapes
                  .dsgFraction
              }}
              {{ headerFormatter(" : 1 ) up to a maximum of $") }}
              {{
                store.loggedInUsersDistrict.district_details.ddfCapes.dsgCap +
                " USD. "
              }}
              {{
                headerFormatter(
                  "on a first come basis depending upon availability of DDF."
                )
              }}
            </h3>
            <h3
              class="my-4 border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black"
            >
              {{
                headerFormatter(
                  "* Your District calculates District Designated Funds from these funding sources: "
                )
              }}
              <strong class="text-center text-primary-green">
                {{ fundingSourcesArrary }}</strong
              >
            </h3>

            <h3
              class="my-4 border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black"
            >
              {{ headerFormatter("your current DDF request limit: $ ") }}
              {{ districtSimplifiedGrantRequestLimit }} USD
            </h3>
            <table
              id="funding_source_table"
              class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
            >
              <thead
                class="t_head text-s bg-primary-black uppercase text-primary-white"
              >
                <th>#</th>
                <th>Source</th>
                <th>Details</th>
                <th>Amount</th>
                <th>Actions</th>
              </thead>
              <tbody>
                <tr class="border bg-white">
                  <td class="px-6 py-4 text-primary-black">*</td>
                  <td class="px-6 py-4 text-primary-black">
                    <BaseSelect
                      :options="addFundingSource"
                      v-model="fundingSourceAdd"
                    />
                  </td>
                  <td class="px-6 py-4 text-primary-black">
                    <BaseInputsText v-model="fundingSources.typeOfFunding" />
                  </td>
                  <td class="px-6 py-4 text-primary-black">
                    <BaseInputsText v-model="fundingSources.amount" />
                  </td>
                  <td class="px-6 py-4 text-primary-black">
                    <button
                      title="Add item"
                      class="crud-buttons text-lg hover:text-primary-color"
                      @click=""
                    >
                      <font-awesome-icon icon="fa-solid fa-circle-plus" />
                    </button>
                  </td>
                </tr>
                <tr
                  class="border bg-white"
                  id="funding_source"
                  v-for="(item, index) in projectToUpdateOrCreate
                    .extra_descriptions.fundingSourceArray"
                  :key="index"
                >
                  <th
                    scope="row"
                    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {{ index + 1 }}
                  </th>
                  <td class="px-6 py-4 text-primary-black">
                    {{ item.sourceName }}
                  </td>
                  <td class="px-6 py-4 text-primary-black">
                    {{ item.typeOfFunding }}
                  </td>

                  <td class="px-6 py-4 text-primary-black">
                    {{ item.amount }}
                  </td>

                  <td class="px-6 py-4 text-primary-black">
                    <button
                      title="Delete item"
                      class="crud-buttons"
                      @click="deleteFromFundsArray(index)"
                    >
                      <font-awesome-icon
                        class="social-icon"
                        icon="trash-alt"
                      ></font-awesome-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="">
                  <th></th>
                  <th></th>
                  <th></th>
                  <th
                    class="border-2 border-primary-color px-6 py-4 font-bold text-primary-black"
                  >
                    Total Funding:
                  </th>
                  <th
                    class="whitespace-nowrap border-2 border-primary-color px-6 py-4 font-bold text-primary-black"
                  >
                    USD {{ sumOfAnticipatedFunding }}
                  </th>
                </tr>
              </tfoot>
            </table>
            <hr class="my-12 h-px w-full border-0 bg-gray-500" />

            <h1
              class="my-4 text-center font-bold underline-offset-8"
              :class="tailwind.H1"
            >
              Your Current Anticipated Funding: {{ sumOfAnticipatedFunding }}
            </h1>
            <h1
              class="my-4 border-primary-dark-color text-center font-bold underline-offset-8"
              :class="tailwind.H1"
            >
              Your Current Funding Goal:
              {{ formatter.format(projectToUpdateOrCreate.funding_goal) }}
            </h1>
            <h1
              class="my-4 text-center font-bold underline-offset-8"
              :class="tailwind.H1"
            >
              Pledge Amount To Date:
              {{ formatter.format(projectToUpdateOrCreate.total_pledges) }}
            </h1>
            <ErrorValidation
              v-if="
                v$.projectToUpdateOrCreate.district_simplified_grant_request
                  .$error
              "
              :errorMsg="
                v$.projectToUpdateOrCreate.district_simplified_grant_request
                  .$errors[0].$message
              "
            />
            <ErrorValidation
              class="text-center"
              v-if="v$.projectToUpdateOrCreate.anticipated_funding.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.anticipated_funding.$errors[0]
                  .$message
              "
            />
            <div class="button_row mt-8 flex justify-center gap-4">
              <RotaryButton
                :label="submitButtonmsg"
                @click="validateDSGProject()"
              />
              <RotaryButton label="Cancel" @click="redirect()" />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="upload_tab" v-if="activeTab2">
      <UploadForm
        v-if="store.$state.DsgOrDMProjectFormProps.formModeProp === 'UPDATE'"
        :projectProp="projectToUpdateOrCreate"
      />
      <div v-else>
        <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
          <span class="">{{
            headerFormatter("Please submit this project first")
          }}</span>
        </h1>
      </div>
    </div>
    <div class="pdf_tab" v-if="activeTab3">
      <DSProjectPdf
        v-if="store.$state.DsgOrDMProjectFormProps.formModeProp === 'UPDATE'"
        :projectProp="projectToUpdateOrCreate"
      />
      <div v-else>
        <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
          <span class="">{{
            headerFormatter("Please submit this project first")
          }}</span>
        </h1>
      </div>
    </div>
    <div class="pledge_tab" v-if="activeTab4">
      <AllPledgesTable
        :pledgesProp="projectToUpdateOrCreate.pledgesAssociated"
      />
    </div>
    <div class="approval_tab" v-if="activeTab5">
      <Toast
        v-if="toast.display"
        :msg="toast.msg"
        :width="toast.width"
        :closeTimer="toast.closeTimer"
      />

      <div
        v-if="projectToUpdateOrCreate.project_status !== 'Reports Due'"
        class="details my-8 flex flex-col items-center gap-8"
      >
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
        <ErrorValidation v-if="projectApproval" :errorMsg="projectApproval" />
        <RotaryButton
          v-if="
            store.$state.loggedInUserData.role[0].district_role ===
              'District Admin' ||
            store.$state.loggedInUserData.role[0].district_role ===
              'District Grants Chair'
          "
          label="Approve"
          @click="approveProject()"
        />

        <h6 v-else class="mt-4 text-center font-bold">
          Must be a District Admin / Grants Chair to approve
        </h6>
      </div>
      <div
        v-if="projectToUpdateOrCreate.project_status === 'Reports Due'"
        class="flex flex-col gap-8"
      >
        <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
          Approve Reports
        </h1>
        <div class="flex justify-center">
          <RotaryButton
            v-if="
              store.$state.loggedInUserData.role[0].district_role ===
                'District Admin' ||
              store.$state.loggedInUserData.role[0].district_role ===
                'District Grants Chair' ||
              store.$state.loggedInUserData.role[0].district_role ===
                'District Foundations Chair' ||
              store.$state.loggedInUserData.role[0].district_role ===
                'District International Chair'
            "
            label="Approve Reports"
            @click="approveReports()"
          />
        </div>
      </div>
    </div>
    <div class="share_tab" v-if="activeTab6">
      <div class="share flex justify-center">
        <button
          class="inline-flex items-center rounded-full bg-blue-700 py-2 px-4 text-white hover:bg-blue-800"
        >
          <font-awesome-icon
            class="mr-4 text-4xl text-primary-white"
            icon="fa-brands fa-square-facebook"
          />

          <ShareNetwork
            network="facebook"
            :url="$data.urlForShare"
            :title="$data.projectToUpdateOrCreate.project_name"
            :description="$data.projectToUpdateOrCreate.project_description"
            quote="Check Out this rotary project and make a pledge!"
            hashtags="myrotaryprojects,"
            class="link"
          >
            Share this Project On Facebook
          </ShareNetwork>
        </button>
      </div>
    </div>
    <div class="addUser_tab" v-if="activeTab7">
      <AddUserProjectForm
        :projectAdminsProp="
          projectToUpdateOrCreate.projectDetails.projectAdmins
        "
        v-if="store.$state.DsgOrDMProjectFormProps.formModeProp === 'UPDATE'"
        :projectId="projectToUpdateOrCreate.project_id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AllPledgesTable from "@/components/common/tables/AllPledgesTable.vue";
import DSProjectPdf from "@/components/common/pdf/DSProjectPdf.vue";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  FORM_MODE_PROP,
  ErrorMessages,
  type IApiError,
  MyError,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
import UploadForm from "@/components/common/forms/UploadForm.vue";
import DistrictUploadModal from "@/components/common/modals/DistrictUploadModal.vue";
import BaseDatePicker from "@/components/common/baseformComponents/BaseDatePicker.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import BaseFileUpload from "@/components/common/baseformComponents/BaseFileUpload.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import BaseCheckBox from "@/components/common/baseformComponents/BaseCheckBox.vue";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";
import BaseTextArea from "@/components/common/baseformComponents/BaseTextArea.vue";
import useVuelidate from "@vuelidate/core";
import ConfirmModal from "@/components/common/../common/modals/ConfirmModal.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import Utilities from "@/utils/frontend/classes/Utilities";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import AddUserProjectForm from "@/components/common/forms/AddUserProjectForm.vue";

import type {
  FundingSource,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from "@vuelidate/validators";
import ProjectsApi from "@/services/Projects";
import {
  GrantType,
  ProjectStatus,
} from "@/utils/shared/interfaces/SharedInterface";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import DsgProject from "@/utils/shared/classes/DsgProject";
interface ImageType {
  label: string;
  key: string;
  [key: string]: string;
}

export default defineComponent({
  name: "DSProjectForm",
  setup() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const store = useRotaryStore();
    const v$ = useVuelidate();
    return {
      v$,
      store,
      formatter,
    };
  },
  components: {
    AllPledgesTable,
    RotaryButton,
    BaseFileUpload,
    BaseSelect,
    BaseCheckBox,
    BaseInputsText,
    BaseTextArea,
    ConfirmModal,
    ExceptionModal,
    Toast,
    BaseInputsTextEmail,
    BaseDatePicker,
    DistrictUploadModal,
    ErrorValidation,
    UploadForm,
    DSProjectPdf,
    AddUserProjectForm,
  },
  props: {},
  data() {
    return {
      urlForShare: "",
      fundingSources: {} as FundingSource,
      fundingSourceAdd: "",
      addFundingSource: [
        "District Designated Funds Request (DDF)",
        "District Club Contribution",
        "Non-District Club Contribution",
        "Co-operating Organization Contribution",
        "Other sources",
      ],
      budgetItemCost: 0,
      budgetItemName: "",
      criteriaList: ResourceLists.districtSimplifiedCriteria,
      projectApproval: "",
      headerFormatter: Utilities.headerFormater,
      projectToUpdateOrCreate: {} as IDsgProject,
      activeTab1: "",
      activeTab2: "",
      activeTab3: "",
      activeTab4: "",
      activeTab5: "",
      activeTab6: "",
      activeTab7: "",
      submitButtonmsg: "Submit",
      tailwind: TAILWIND_COMMON_CLASSES,
      expectionObject: {} as IApiException,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      allowedToLeaveForm: false,
      submited: false,
      serverException: false,
      countryList: ResourceLists.countryList,
      areaFocusImages: ResourceLists.areaFocusImages,
      regionList: ResourceLists.regionList,
      areaFocusList: [] as Array<ImageType>,
    };
  },
  watch: {},
  validations() {
    return {
      projectToUpdateOrCreate: {
        project_name: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        },
        project_description: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(3000),
          minLenght: minLength(100),
        },
        area_focus: {
          oneMustBeSelected: helpers.withMessage(
            ErrorMessages.ONE_MUST_BE_SELECTED,
            () => {
              const areaFocuseValues = Object.values(
                this.projectToUpdateOrCreate.area_focus
              );
              return areaFocuseValues.includes(true);
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
                  this.projectToUpdateOrCreate.anticipated_funding.toString()
                ) <=
                parseFloat(this.projectToUpdateOrCreate.funding_goal.toString())
              ) {
                return true;
              } else {
                return false;
              }
            }
          ),
          cantBelowerThanPledgesTotal: helpers.withMessage(
            ErrorMessages.CANT_BE_LOWER_THAN_PLEDGES_TOTAL,
            () => {
              if (
                parseFloat(
                  this.projectToUpdateOrCreate.anticipated_funding.toString()
                ) >=
                parseFloat(
                  this.projectToUpdateOrCreate.total_pledges.toString()
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
            maxLength: maxLength(3000),
            minLength: minLength(150),
          },
          non_financial_participation: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
            maxLength: maxLength(3000),
            minLength: minLength(150),
          },
          primary_contact: {
            address: { required },
            email: { required, email },
            name: { required },
            phone: { required },
          },
        },
        district_simplified_grant_request: {
          validateRequest: helpers.withMessage(
            "You have exceeded the maximum amount for your Grant Request. Please adjust.",
            () => {
              if (
                this.projectToUpdateOrCreate.district_simplified_grant_request >
                (this.districtSimplifiedGrantRequestLimit as number)
              ) {
                return false;
              } else {
                return true;
              }
            }
          ),
        },
      },
    };
  },
  async created() {
    this.setTab(1);
    if (this.store.$state.DsgOrDMProjectFormProps.formModeProp === "UPDATE") {
      this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
      await this.populateFormData();
    } else if (
      this.store.$state.DsgOrDMProjectFormProps.formModeProp === "CREATE"
    ) {
      this.projectToUpdateOrCreate = new DsgProject();
      this.projectToUpdateOrCreate.grant_type =
        GrantType.DISTRICTSIMPLIFIEDPROJECT;
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
    debugger;
  },
  methods: {
    async approveReports() {
      try {
        const response = await ProjectsApi.updateProjectStatus(
          this.projectToUpdateOrCreate.project_id as number,
          ProjectStatus.COMPLETED
        );
        if (!Utilities.isAnApiError(response) && response === true) {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = this.headerFormatter(
            "Reports Approved. Project is complete."
          );
          setTimeout(async () => {
            this.toast.display = false;
            this.$router.push("/");
          }, 4000);
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.expectionObject = error as IApiException;
        this.serverException = true;
      }
    },

    // fix later
    deleteItemByIndex(index: number) {
      const item = this.projectToUpdateOrCreate.itemized_budget[index];
      this.projectToUpdateOrCreate.funding_goal -= item.itemCost;
      this.projectToUpdateOrCreate.itemized_budget.splice(index, 1);
    },
    // fix later
    deleteFromFundsArray(index: number) {
      const fundingSource =
        this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray[
          index
        ];
      if (fundingSource.sourceName === "District Club Contribution") {
        this.projectToUpdateOrCreate.intial_sponsor_club_contribution -=
          parseFloat(fundingSource.amount.toString());
      } else if (
        fundingSource.sourceName === "Non-District Club Contribution"
      ) {
        this.projectToUpdateOrCreate.extra_descriptions.other_club_contribution -=
          parseFloat(fundingSource.amount.toString());
      } else if (
        fundingSource.sourceName === "District Designated Funds Request (DDF)"
      ) {
        this.projectToUpdateOrCreate.district_simplified_grant_request -=
          parseFloat(fundingSource.amount.toString());
      } else if (
        fundingSource.sourceName === "Co-operating Organization Contribution"
      ) {
        this.projectToUpdateOrCreate.co_operating_organisation_contribution -=
          parseFloat(fundingSource.amount.toString());
      } else if (fundingSource.sourceName === "Other sources") {
        this.projectToUpdateOrCreate.extra_descriptions.other_sources -=
          parseFloat(fundingSource.amount.toString());
      }
      this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.splice(
        index,
        1
      );
    },
    addToBudget(itemName: string, itemCost: number) {
      if (itemCost < 0) {
        window.scrollTo(0, 0);
        this.toast.display = true;
        this.toast.msg = "Cost cannot be negative";
        setTimeout(() => {
          this.toast.display = false;
        }, 2000);
        this.budgetItemCost = 0;
        return;
      }
      const budgetItemObject = { itemCost: itemCost, itemName: itemName };
      budgetItemObject.itemCost = parseFloat(
        parseFloat(itemCost.toString()).toFixed(2)
      );
      //   Fix later lol
      this.projectToUpdateOrCreate.funding_goal += budgetItemObject.itemCost;
      this.projectToUpdateOrCreate.itemized_budget.push(budgetItemObject);
      this.budgetItemCost = 0;
      this.budgetItemName = "";
    },
    async approveProject() {
      if (
        this.projectToUpdateOrCreate.project_status !==
        ProjectStatus.PENDINGAPPROVAL
      ) {
        this.projectApproval = "Project has not been submitted for approval.";
        setTimeout(() => {
          this.projectApproval = "";
        }, 3000);
        return;
      }
      try {
        const response = await ProjectsApi.updateProjectStatus(
          this.projectToUpdateOrCreate.project_id as number,
          ProjectStatus.APPROVED
        );
        if (!Utilities.isAnApiError(response) && response === true) {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = this.headerFormatter("Project Approved");
          setTimeout(async () => {
            this.toast.display = false;
            this.$router.push("/");
          }, 4000);
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.expectionObject = error as IApiException;
        this.serverException = true;
      }
    },
    async createDSGProject() {
      try {
        const response = await ProjectsApi.createNewProject(
          this.projectToUpdateOrCreate
        );
        if (!Utilities.isAnApiError(response)) {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = this.headerFormatter(
            "Project Created. You can begin uploading files"
          );
          this.store.setDSGOrDMFormProps({
            formModeProp: "UPDATE",
            porjectIdProp: response as number,
          });
          this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
          setTimeout(async () => {
            this.toast.display = false;
            await this.populateFormData(response as number);
          }, 4000);
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async updateDSGProject() {
      try {
        const response = await ProjectsApi.updateProject(
          this.projectToUpdateOrCreate
        );
        if (!Utilities.isAnApiError(response)) {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = this.headerFormatter("Project Updated");
          setTimeout(async () => {
            this.toast.display = false;
            this.redirect();
          }, 4000);
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async validateDSGProject(): Promise<void> {
      await this.v$.$validate();
      if (this.v$.$error) {
        window.scrollTo(0, 0);
        this.toast.display = true;
        this.toast.msg = "Fix Form Errors";
        setTimeout(() => {
          this.toast.display = false;
        }, 4000);
        return;
      }
      if (!this.v$.$error) {
        if (
          this.store.$state.DsgOrDMProjectFormProps.formModeProp === "CREATE"
        ) {
          this.createDSGProject();
        } else if (
          this.store.$state.DsgOrDMProjectFormProps.formModeProp === "UPDATE"
        ) {
          this.updateDSGProject();
        }
      }
    },
    async populateFormData(responseProjectId?: number) {
      try {
        const response = await ProjectsApi.getProjectById(
          responseProjectId
            ? responseProjectId
            : (this.store.$state.DsgOrDMProjectFormProps
                .porjectIdProp as number)
        );
        if (!Utilities.isAnApiError(response)) {
          this.projectToUpdateOrCreate = response as IDsgProject;
          this.urlForShare =
            "https://myrotaryprojects.org/" +
            "project/" +
            this.projectToUpdateOrCreate.project_id;
        } else throw new MyError((response as IApiError).message);
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    setTab(tab: number) {
      switch (tab) {
        case 1:
          this.activeTab1 = "bg-gray-200";
          this.activeTab2 = "";
          this.activeTab3 = "";
          this.activeTab4 = "";
          this.activeTab5 = "";
          this.activeTab6 = "";
          this.activeTab7 = "";
          break;
        case 2:
          this.activeTab1 = "";
          this.activeTab2 = "bg-gray-200";
          this.activeTab3 = "";
          this.activeTab4 = "";
          this.activeTab5 = "";
          this.activeTab6 = "";
          this.activeTab7 = "";
          break;
        case 3:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "bg-gray-200";
          this.activeTab4 = "";
          this.activeTab5 = "";
          this.activeTab6 = "";
          this.activeTab7 = "";
          break;
        case 4:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "";
          this.activeTab4 = "bg-gray-200";
          this.activeTab5 = "";
          this.activeTab6 = "";
          this.activeTab7 = "";
          break;
        case 5:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "";
          this.activeTab4 = "";
          this.activeTab5 = "bg-gray-200";
          this.activeTab6 = "";
          this.activeTab7 = "";
          break;
        case 6:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "";
          this.activeTab4 = "";
          this.activeTab5 = "";
          this.activeTab6 = "bg-gray-200";
          this.activeTab7 = "";
          break;
        case 7:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "";
          this.activeTab4 = "";
          this.activeTab5 = "";
          this.activeTab6 = "";
          this.activeTab7 = "bg-gray-200";
          break;
        default:
          break;
      }
    },
    formatterMoney(amount: number) {
      if (amount) {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        return "Total Pledges :" + formatter.format(amount);
      } else {
        return this.headerFormatter(
          "Total Pledge Amount not available check pledges tab"
        );
      }
    },
    redirect() {
      this.store.$state.canLeaveForm = true;
      this.$router.go(-1);
    },
  },
  computed: {
    sumOfAnticipatedFunding() {
      let sum: number = 0;
      this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.forEach(
        (el) => {
          sum = sum + parseFloat(el.amount.toString());
        }
      );
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      this.projectToUpdateOrCreate.anticipated_funding =
        sum + parseFloat(this.projectToUpdateOrCreate.total_pledges.toString());
      return formatter.format(
        parseFloat(this.projectToUpdateOrCreate.anticipated_funding.toFixed(2))
      );
    },
    sumOfItemsCost() {
      let sum = 0;
      this.projectToUpdateOrCreate.itemized_budget.forEach(
        (item: { itemCost: number }) => {
          sum = sum + item.itemCost;
        }
      );
      return this.formatter.format(parseFloat(sum.toFixed(2)));
    },
    fundingSourcesArrary() {
      let sourcesArray = [] as string[];
      this.store.loggedInUsersDistrict.district_details.ddfCalculation.forEach(
        (ele: { toString: () => string }) => {
          sourcesArray.push(" " + ele.toString());
        }
      );

      return sourcesArray.toString();
    },
    districtSimplifiedGrantRequestLimit() {
      const cap = this.store.loggedInUsersDistrict.district_details.ddfCapes
        .dsgCap as number;
      const fraction = this.store.loggedInUsersDistrict.district_details
        .ddfCapes.dsgFraction as number;
      let limit: number = 0;
      let total: number = 0;
      this.store.loggedInUsersDistrict.district_details.ddfCalculation.forEach(
        (ele) => {
          this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.forEach(
            (el) => {
              if (el.sourceName === ele) {
                total = total + parseFloat(el.amount.toString());
              }
            }
          );
        }
      );
      if (total < parseFloat(cap.toString())) {
        limit = total * parseFloat(fraction.toString());
      } else {
        limit = parseFloat(cap.toString());
      }
      return parseFloat(limit.toFixed(2));
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
.t_head {
  height: 50px;
  th {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
#funding_source_table {
  width: 140%;
  height: 100%;
  overflow: auto;
  position: relative;
  left: -110px;
}
</style>
