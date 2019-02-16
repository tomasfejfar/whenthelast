<script>
  import {auth} from '@/firebase.js'
  export default {
    data (){
      return {
      }
    },
    created:function(){
      auth.signOut();
      this.$router.push('/');
    },
    render() {
      return '';
    }
  }
</script>
