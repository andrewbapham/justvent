curl -sL \
  "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh" > \
  "Miniconda3.sh"

bash "Miniconda3.sh" 

conda update conda

conda create -f ../conda_env.yml

conda activate hth

pip install -r ../requirements.txt
