<script>
import { Pie, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  name: 'PieChart',
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  extends: Pie,
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style scoped>

</style>
