
export default {
    template:` <div class="custom-number-filter">
    <label>
      <input
        type="checkbox"
        :checked="isAllSelected"
        @change="onSelectAllChange($event)"
      />
      All
    </label>
    <div v-for="(range, index) in ranges" :key="index">
      <label>
        <input
          type="checkbox"
          :value="range"
          :checked="selectedRanges.includes(range)"
          @change="onCheckboxChange($event, range)"
        />
        {{ range.label }}
      </label>
    </div>
  </div>`,
  props: ['agParams'], // Make sure agParams is passed as a prop
  data() {
    return {
      
      selectedRanges: [],
      ranges: [
        { label: "2000-2010", min: 2000, max: 2010 },
        { label: "2011-2020", min: 2011, max: 2020 },
        // Add more ranges as needed
      ],
    };
  },
  computed: {
    // Compute whether all checkboxes are selected
    isAllSelected() {
      return this.selectedRanges.length === this.ranges.length;
    },
  },
  methods: {
    onSelectAllChange(event) {
      if (event.target.checked) {
        // Select all ranges if "All" is checked
        this.selectedRanges = [...this.ranges];
      } else {
        // Deselect all ranges if "All" is unchecked
        this.selectedRanges = [];
      }
      // Notify AG Grid that the filter has changed
      if (this.params) {
        this.params.filterChangedCallback();
      }
    },
    onCheckboxChange(event, range) {
      if (event.target.checked) {
        this.selectedRanges.push(range);
      } else {
        this.selectedRanges = this.selectedRanges.filter(
          (r) => r !== range
        );
      }
      // Notify AG Grid that the filter has changed
      if (this.params) {
        this.params.filterChangedCallback();
      }
    },
    isFilterActive() {
      return this.selectedRanges.length > 0;
    },
    doesFilterPass(params) {
      const rowValue = params.data.year; // Assuming you are filtering on a 'year' field
      return this.selectedRanges.some((range) => {
        return rowValue >= range.min && rowValue <= range.max;
      });
    },
    getModel() {
      if (!this.isFilterActive()) {
        return null;
      }
      return { selectedRanges: this.selectedRanges };
    },
    setModel(model) {
      if (model && model.selectedRanges) {
        this.selectedRanges = model.selectedRanges;
      } else {
        this.selectedRanges = [];
      }
    },
  },
  mounted() {
    // Assign agParams to params in mounted hook
    if (this.agParams) {
      this.params = this.agParams;
    } else {
      console.error('agParams not passed to the component');
    }
  },
};


{/* <style scoped>
.custom-number-filter {
  display: flex;
  flex-direction: column;
}
</style> */}
