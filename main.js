import { createApp, onBeforeMount, ref, shallowRef } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "./style.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import PersonFilter from "./personFilterVue.js";
import YearFilter from "./yearFilterVue.js";
import yearRangeFilterVue from "./yearRangeFilterVue.js";

const VueExample = {
  template: `
        <div style="height: 100%">
                <ag-grid-vue
      style="width: 100%; height: 100%;"
      :class="themeClass"
      :columnDefs="columnDefs"
      @grid-ready="onGridReady"
      :defaultColDef="defaultColDef"
      :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    PersonFilter,
    YearFilter,
    yearRangeFilterVue
  },
  setup(props) {
    const columnDefs = ref([
      { field: "athlete", minWidth: 150, filter: "PersonFilter" },
      { field: "year", minWidth: 130, filter: "yearRangeFilterVue" },
      { field: "country", minWidth: 150 },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ]);
    const gridApi = shallowRef();
    const defaultColDef = ref({
      flex: 1,
      minWidth: 100,
    });
    const rowData = ref(null);

    onBeforeMount(() => {});

    const onGridReady = (params) => {
      gridApi.value = params.api;

      const updateData = (data) => {
        rowData.value = data;
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => {data.length= 20;updateData(data)});
    };

    return {
      columnDefs,
      gridApi,
      defaultColDef,
      rowData,
      onGridReady,
      themeClass:
        "ag-theme-quartz",
    };
  },
};

createApp(VueExample).mount("#app");
