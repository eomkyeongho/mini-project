<template>
 <v-card
    class="mx-auto"
    max-width="1230"
  >
    <v-layout>
      <v-app-bar
        color="white"
        density="compact"
      >
      <v-img src="./assets/logo.png"></v-img>
        <v-app-bar-title></v-app-bar-title>
      </v-app-bar>

      <v-main>
        <v-card 
        v-if="create == true"
        class="ma-10 pb-5"
        color="blue-grey-lighten-5"
         >
        <v-btn
        class="ma-2"
        color="red-darken-4"
        max-width="30"
        @click="create=false"
        >X</v-btn>
        <v-text-field label="제목" v-model="inputTitle" class="ma-10"></v-text-field>
        <v-text-field label="내용" v-model="inputContext" class="ma-10"></v-text-field>
        <v-text-field label="장소" v-model="inputPlace" class="ma-10"></v-text-field>
        <v-text-field label="시간" v-model="inputTime" class="ma-10"></v-text-field>
        <v-select
        class="ma-10"
        label="음식 종류"
        :items="['korean', 'japanese', 'chinese']"
        v-model="inputFood"
        ></v-select>
        <v-container class="text-center">
          <v-btn @click="post()">완료</v-btn>
        </v-container>
      </v-card>
        <v-card 
        v-if="detail == true"
        class="ma-10 pb-5"
        color="blue-grey-lighten-5"
        >
        <v-btn
        class="ma-2"
        color="red-darken-4"
        max-width="30"
        @click="detail=false"
        >X</v-btn>
        <div class="mt-5 ml-5 mb-2">
          제목
        </div>
        <v-card
        class="mx-5 mb-5 pa-2"
        >
           {{ detailPost.title }}
        </v-card>
        <div class="ml-5 mb-2">
          내용
        </div>
        <v-card
        class="mx-5 mb-5 pa-2"
        >
           {{ detailPost.content }}
        </v-card>
        <hr class="my-7">
        <div class="ml-5 mb-2">
          댓글
        </div>
        <v-card class="mx-5 my-2 pa-1" v-for="comment in comments[detailPost.id]" :key=comment>
          {{ comment.writer }} | {{ comment.content }}
        </v-card>
        <v-text-field label="댓글" v-model="inputComment" class="mx-10 mt-7"></v-text-field>
        <v-text-field label="작성자" v-model="inputWriter" class="mx-10"></v-text-field>
        <v-container class="text-center">
          <v-btn @click="comment()">완료</v-btn>
        </v-container>
        </v-card>
        <v-btn class="mt-8 ml-8 bg-blue-darken-1" @click="detail=false;create=true">
  새글 작성
</v-btn>
        <v-container class="blue-lighten-3 mb-6">
          <v-row dense>
            <v-col v-for="post in posts" :key=post cols="4" md="3">
          <v-sheet class="pa-2 ma-2">
            <div>
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="mx-auto"
        color="grey-lighten-4"
        max-width="250"
        v-bind="props"
        @click = "detail = true;create=false;detailPost = post"
      >
        <v-img v-if="post.food == 'korean'"
          :aspect-ratio="20/9"
          cover
          src="./assets/korean.jpg"
        >
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-blue-darken-1 v-card--reveal"
              style="height: 100%; justify-content: center; align-items: center;"
            >
            {{post.time}} {{ post.place }}
            </div>
          </v-expand-transition>
        </v-img>

        <v-img v-else-if="post.food == 'japanese'"
          :aspect-ratio="20/9"
          cover
          src="./assets/japanese.jpg"
        >
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-blue-darken-1 v-card--reveal"
              style="height: 100%; justify-content: center; align-items: center;"
            >
            {{post.time}} {{ post.place }}
            </div>
          </v-expand-transition>
        </v-img>

        <v-img v-else-if="post.food == 'chinese'"
          :aspect-ratio="20/9"
          cover
          src="./assets/chinese.jpg"
        >
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-blue-darken-1 v-card--reveal"
              style="height: 100%; justify-content: center; align-items: center;"
            >
            {{post.time}} {{ post.place }}
            </div>
          </v-expand-transition>
        </v-img>

        <v-card-text class="pt-6">
          <div class="font-weight-light text-h6 mb-2">
            {{post.title}}
          </div>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
          </v-sheet>
        </v-col>
        </v-row>
    </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    inputTitle : '',
    inputContext : '',
    inputTime : '',
    inputFood : '',
    inputPlace : '',
    inputComment : '',
    inputWriter : '',
    detail : false,
    create : false,
    detailPost : null,
    posts : [{id : 1, title : "6:30에 밥드실분!", content : "6:20까지 라운지로 오세요!", food : "korean", time : "6:30", place : "XX한식집"},
    {id : 2, title : "7:20에 밥드실분!", content : "7:10까지 씨앗방2로 오세요!", food : "japanese", time : "7:20", place : "XX일식집"},
    {id : 3, title : "7:30에 밥드실분!", content : "7:20까지 씨앗방1로 오세요!", food : "chinese", time : "7:30", place : "XX중식집"},
    {id : 4, title : "6:50에 밥드실분!", content : "6:40까지 로비로 오세요!", food : "korean", time : "6:50", place : "XX한식집"},
    {id : 5, title : "6:50에 밥드실분!", content : "6:40까지 로비로 오세요!", food : "japanese", time : "6:50", place : "XX일식집"},
    {id : 6, title : "7:00에 밥드실분!", content : "7:00까지 로비로 오세요!", food : "japanese", time : "7:00", place : "XX일식집"}
   ],
   comments : { 1 : [{ writer : "연수생1", content : "저요!"}, { writer : "연수생2", content : "저도요!"}, { writer : "연수생7", content : "저도 먹고 싶어요!"}], 
    2 : [{ writer : "연수생3", content : "저요!"}, { writer : "연수생4", content : "저도요!"}], 
    3 : [{ writer : "연수생5", content : "저요!"}, { writer : "연수생6", content : "저도요!"}], 
  }
  }),
  methods : {
    post() {
      if (this.inputTitle == '' || this.inputContext == '' || this.inputFood == '' || this.inputTime == '' || this.inputPlace == '') {
        return;
      }

      this.posts.push({id : this.posts.length + 1, title : this.inputTitle, content : this.inputContext, food : this.inputFood, time : this.inputTime, place : this.inputPlace})
      this.inputTitle = '';
      this.inputContext = '';
      this.inputFood = '';
      this.inputTime = '';
      this.inputPlace = '';
      this.create = false;
    },
    comment() {
      if(this.inputComment == '' || this.inputWriter == '') {
        return;
      }

      if (this.comments[this.detailPost.id] == null) {
        this.comments[this.detailPost.id] = [];
      }
      this.comments[this.detailPost.id].push({writer : this.inputWriter, content : this.inputComment})
      this.inputComment = '';
    }
  }
}
</script>
