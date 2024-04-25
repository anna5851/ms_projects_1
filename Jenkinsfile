pipeline {
  agent any
  stages{
    stage("checkout"){
      steps{
        checkout scm
      }
    }
    stage("Build Image"){
      steps{
        sh 'docker build -t my_node_app_ms:1.0 .'
      }
    }
    stage("Docker Push"){
      steps{
        withCredentials([usernamePassword(credentialsId:'docker_cred', passwordVariable:'DOCKERHUB_PASSWORD', usernameVariable:'DOCKERHUB_USERNAME')]) {
          sh "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
          sh "docker tag my_node_app_ms:1.0 anna5851/ms_projects:1.0"
          sh "docker push anna5851/my_node_app_ms:1.0"
          sh "docker logout"
        }
      }
    }
  }
}
