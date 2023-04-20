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
        v-if="detail == true"
        class="ma-10"
        color="blue-grey-lighten-5"
        >
        <v-btn
        class="ma-2"
        color="red-darken-4"
        @click="detail=false"
        >
          X
        </v-btn>
        <div class="mt-5 ml-5">
          제목
        </div>
        <v-card
        class="ml-5 mr-5 mb-5"
        >
          {{ detailPost.title }}
        </v-card>
        <div class="ml-5">
          내용
        </div>
        <v-card
        class="ml-5 mr-5 mb-5"
        >
          {{ detailPost.content }}
        </v-card>
          
        </v-card>
        <v-btn class="mt-8 ml-8 bg-blue-darken-1">
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
        @click = "detail = true;detailPost = post"
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
    detail : false,
    detailPost : null,
    posts : [{id : 1, title : "6:30에 밥드실분!", content : "6:20까지 라운지로 오세요!", food : "korean", time : "6:30", place : "XX한식집"},
    {id : 2, title : "7:20에 밥드실분!", content : "7:10까지 씨앗방2로 오세요!", food : "japanese", time : "7:20", place : "XX일식집"},
    {id : 3, title : "7:30에 밥드실분!", content : "7:20까지 씨앗방1로 오세요!", food : "chinese", time : "7:30", place : "XX중식집"},
    {id : 4, title : "6:50에 밥드실분!", content : "6:40까지 로비로 오세요!", food : "korean", time : "6:50", place : "XX한식집"},
    {id : 5, title : "6:50에 밥드실분!", content : "6:40까지 로비로 오세요!", food : "japanese", time : "6:50", place : "XX일식집"},
    {id : 6, title : "7:00에 밥드실분!", content : "7:00까지 로비로 오세요!", food : "japanese", time : "7:00", place : "XX일식집"}
   ]
  }),
  methods : {
    
  }
}
</script>
