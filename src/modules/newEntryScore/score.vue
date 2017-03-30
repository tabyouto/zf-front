<template>
  <div class="score-wrap">
    <div class="score-list">
      <h1 class="text-center">成绩单</h1>
      <div class="item-wrap">
        <ul>
          <li  v-for="item in scoreList">
            <p>{{item.name}}</p>
            <p>
              <span>学分：{{item.score}}</span>
              <span>绩点：{{item.jd}}</span>
              <span>是否学位课：{{item.isScore}}</span>
              <span class="pull-right"><input class="checkbox" type="checkbox" name="score"></span>
            </p>
          </li>
        </ul>
      </div>
      <div class="btn-wrap">
        <button class="btn btn-default btn-success" v-on:click="getDegree" type="button">计算学位课绩点</button>
      </div>
      <div class="score-result text-center">
        <h2>你的绩点</h2>
        <span class="text-danger">{{result}}</span>
      </div>
    </div>
    <loading-component v-if="editFlag"></loading-component>
  </div>
</template>
<script>
  import {fetchSpecificSchedule,fetchDegreeList} from '../../common/commonAjax.js';
  import {numDiv,numAdd,numMulti} from '../../common/util';
  import LoadingComponent from '../../components/loading.vue';
  export default{
    data(){
      return {
        scoreList: [{
          name: 'jisuanji',
          score: '3',//学分
          jd: '3.8', //绩点
          isScore: '是'
        },{
          name: 'jisuanji',
          score: '3',//学分
          jd: '3.8', //绩点
          isScore: '是'
        },{
          name: 'jisuanji',
          score: '3',//学分
          jd: '3.8', //绩点
          isScore: '是'
        },{
          name: 'jisuanji',
          score: '3',//学分
          jd: '3.8', //绩点
          isScore: '是'
        },{
          name: 'jisuanji',
          score: '3',//学分
          jd: '3.8', //绩点
          isScore: '是'
        }],
        editFlag: false,
        result: 0
      }
    },
    components: {
      'loading-component': LoadingComponent
    },
    methods: {
      getDegree: function () {
        let that = this;
        fetchDegreeList({
          class_number: localStorage.getItem('userNumber'),
          class_passwd: localStorage.getItem('classPasswd'),
          token:  sessionStorage.getItem('token')
        }).then(function (res) {
          let list = res.info.list.split(',');
          let scoreList = JSON.parse(sessionStorage.getItem('allScore')).scoreData;
          let scoreListLen = scoreList.length;
          let countRes = 0;
          list.forEach(function (item) {
            for(let i = 0;i < scoreListLen; i++) {
              if(item == scoreList[i]['id']) {
                countRes = numAdd(countRes,numMulti(scoreList[i]['score'],scoreList[i]['jd']));
                break;
              }
            }
          });
          that.result = numDiv(countRes,res.info.score);
        })
      }
    },

    computed: {

    },
    created () {
      let data = sessionStorage.getItem('allScore');
      if(data) {
        this.scoreList = JSON.parse(data).scoreData;
      }
    },
  }

</script>
