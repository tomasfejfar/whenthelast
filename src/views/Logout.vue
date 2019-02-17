<script>
import { auth } from '@/firebase_config.js';
export default {
  data() {
    return {};
  },
  created: function() {
    auth.signOut();
    this.$router.push('/');
  },
  render() {
    return '';
  }
};
</script>
