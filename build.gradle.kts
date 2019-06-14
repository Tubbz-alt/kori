plugins {
  kotlin("multiplatform") version "1.3.31"
}

repositories {
  mavenCentral()
}

kotlin {
  jvm()
  js() {
    val main by compilations.getting {
      kotlinOptions {
        moduleKind = "commonjs"
        sourceMap = true
        sourceMapEmbedSources = "always"
      }
    }
  }
  macosX64("macos") {
    binaries {
      framework {
        isStatic = true
      }
    }
  }
  linuxX64("linux")
  mingwX64("win")

  println("Platform targets ${targets.names}")

  sourceSets {
    val commonMain by getting {
      dependencies {
        implementation(kotlin("stdlib-common"))
      }
    }
    val commonTest by getting {
      dependencies {
        implementation(kotlin("test-common"))
        implementation(kotlin("test-annotations-common"))
      }
    }

    jvm().compilations["main"].defaultSourceSet {
      dependencies {
        implementation(kotlin("stdlib-jdk8"))
      }
    }

    println("JVM ${jvm().compilations["test"].kotlinSourceSets}")
    println("JVM ${jvm().compilations["test"].allKotlinSourceSets}")

    jvm().compilations["test"].defaultSourceSet {
      dependencies {
        implementation(kotlin("test-junit"))
      }
    }

    js {
      compilations["main"].defaultSourceSet {
        dependencies {
          implementation(kotlin("stdlib-js"))
        }
      }
      compilations["test"].defaultSourceSet {
        dependencies {
          implementation(kotlin("test-js"))
        }

      }
    }

    macosX64("macos") {
      compilations["main"].defaultSourceSet {

      }
      compilations["test"].defaultSourceSet {

      }
    }
  }
}
