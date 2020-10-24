const musics = require("../models/musics.json");
const fs = require("fs");

const getAllMusics = (req, res) => {
  console.log(req.query);
  const artist = req.query.artists
  const musicsLaunchYear = req.query.launchYear

  if(artist) {
    const musicsByArtist = musics.filter(musics => musics.artists.includes(artist));
    res.status(200).send(musicsByArtist);
  } else {
  res.status(200).send(musics);
  };



};

const getMusicById = (req, res) => {
  const id = req.params.id;
  const music = musics.find((music) => music.id == id);
  res.status(200).send(music);
};

const postMusic = (req, res) => {
  console.log(req.body);

  const {
    id,
    title,
    duration,
    launchYear,
    favorited,
    single,
    artists,
  } = req.body;
  musics.push({ id, title, duration, launchYear, favorited, single, artists });

  fs.writeFile(
    "./src/models/musics.json",
    JSON.stringify(musics),
    "utf8",
    function (err) {
      if (err) {
        return res.status(424).send({ message: err });
      }
      console.log("Música adicionada com sucesso!");
    }
  );
  res.status(201).send(musics);
};

const updateMusic = (req, res) => {
        const musicId = req.params.id
        
        const musicToUpdate = req.body 

        const musicFound = musics.find(music => music.id == musicId) 

        const musicIndex = musics.indexOf(musicFound) 


        if (musicIndex >= 0) { 
            musics.splice(musicIndex, 1, musicToUpdate)  
        } else {
            res.status(404).send({ message: "Erro: música a ser atualizada não encontrada" })
        }

        fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) { 
            if (err) {
                res.status(500).send({ message: err }) 
            } else {
                console.log(`Arquivo de música ${musicId} atualizado com sucesso!`)
                const musicUpdated = musics.find(music => music.id == musicId);
                res.status(200).send(musicUpdated);
            };
        });
};

const updateFavoritedStatus = (req, res) => {
    const musicId = req.params.id;
    const favorited = req.body.favorited;

    const  musicToUpdate = musics.find(music => music.id == musicId);
    const musicIndex = musics.indexOf(musicToUpdate);

    if (musicIndex >= 0){
        musicToUpdate.favorited = favorited;
        musics.splice(musicIndex, 1, musicToUpdate);
    } else {
        res.status(404).send({ message: "Música não encontrada. Não foi possível informar se está ou não favoritada." });
    };
    fs.writeFile("./src/models/musics.json", JSON.stringify(musics), "utf8", function(err) {
        if (err) {
            res.status(500).send({ message: err})
        } else {
            console.log(`Status favorited da música ${musicId} atualizado com sucesso! :)`);
            const musicUpdated = musics.find((music) => music.id == musicId);
            res.status(200).send(musicUpdated);
        };
    });
};

const deleteMusic = (req, res) => {
  try {
    const musicId = req.params.id;
    const musicFound = musics.find(music => music.id == musicId);
    const musicIndex = musics.indexOf(musicFound); 

    if (musicIndex >= 0) {
      musics.splice(musicIndex, 1);
    } else {
      res.status(404).send({ message: "Música não foi encontrada para ser deletada!"});
    }

    fs.writeFile("./src/models/musics.json", JSON.stringify(musics), "utf8", function(err){
      if(err){
        res.status(500).send({ message: err });
      } else {
        console.log("Música deletada com sucesso do arquivo!")
        res.sendStatus(204);
      }
    })
  } catch(err) {
    console.log(err)
    res.status(500).send({ message: "Erro ao deletar a música"})
  }
}

module.exports = {
  getAllMusics,
  getMusicById,
  postMusic,
  updateMusic,
  updateFavoritedStatus,
  deleteMusic,
};
