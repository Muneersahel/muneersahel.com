{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.corepack
  ];
  idx.extensions = [
    "angular.ng-template"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "yarn"
          "start"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
          "--disable-host-check"
        ];
        manager = "web";
      };
    };
  };
}