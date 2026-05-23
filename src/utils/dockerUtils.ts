import YAML from 'yaml';

export interface DockerPort {
  id: string;
  host: string;
  container: string;
}

export interface DockerEnvVar {
  id: string;
  key: string;
  value: string;
}

export interface DockerVolume {
  id: string;
  host: string;
  container: string;
}

export interface DockerService {
  id: string;
  name: string;
  image: string;
  ports: DockerPort[];
  environment: DockerEnvVar[];
  volumes: DockerVolume[];
  depends_on: string[];
}

export function generateDockerComposeYaml(services: DockerService[]): string {
  if (!services || services.length === 0) {
    return '# Add services to generate docker-compose.yml\n';
  }

  const composeObj: any = {
    version: '3.8',
    services: {},
  };

  for (const service of services) {
    const serviceObj: any = {
      image: service.image,
    };

    if (service.ports.length > 0) {
      serviceObj.ports = service.ports.map(p => `${p.host}:${p.container}`);
    }

    if (service.environment.length > 0) {
      // Create key-value object for environment variables
      serviceObj.environment = {};
      for (const env of service.environment) {
        if (env.key.trim()) {
          serviceObj.environment[env.key.trim()] = env.value;
        }
      }
      if (Object.keys(serviceObj.environment).length === 0) {
        delete serviceObj.environment;
      }
    }

    if (service.volumes.length > 0) {
      serviceObj.volumes = service.volumes.map(v => `${v.host}:${v.container}`);
    }

    if (service.depends_on.length > 0) {
      // Filter out depends_on that reference deleted services
      const validDependencies = service.depends_on.filter(depId => services.some(s => s.id === depId));
      if (validDependencies.length > 0) {
        serviceObj.depends_on = validDependencies.map(depId => {
          const target = services.find(s => s.id === depId);
          return target ? target.name : '';
        }).filter(name => name !== '');
      }
    }

    composeObj.services[service.name || 'unnamed_service'] = serviceObj;
  }

  return YAML.stringify(composeObj, { indent: 2, lineWidth: 0 });
}

export const COMMON_TEMPLATES = {
  postgres: {
    name: 'postgres',
    image: 'postgres:15-alpine',
    ports: [{ host: '5432', container: '5432' }],
    environment: [
      { key: 'POSTGRES_USER', value: 'myuser' },
      { key: 'POSTGRES_PASSWORD', value: 'mypassword' },
      { key: 'POSTGRES_DB', value: 'mydb' },
    ],
    volumes: [{ host: './pgdata', container: '/var/lib/postgresql/data' }],
  },
  redis: {
    name: 'redis',
    image: 'redis:7-alpine',
    ports: [{ host: '6379', container: '6379' }],
    environment: [],
    volumes: [{ host: './redisdata', container: '/data' }],
  },
  node: {
    name: 'api',
    image: 'node:20-alpine',
    ports: [{ host: '3000', container: '3000' }],
    environment: [
      { key: 'NODE_ENV', value: 'development' },
    ],
    volumes: [{ host: '.', container: '/app' }],
  },
  nginx: {
    name: 'nginx',
    image: 'nginx:alpine',
    ports: [{ host: '80', container: '80' }],
    environment: [],
    volumes: [{ host: './nginx.conf', container: '/etc/nginx/nginx.conf' }],
  },
};
